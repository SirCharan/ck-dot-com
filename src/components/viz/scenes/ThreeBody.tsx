"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { makeGlowTexture, PALETTE } from "../lib/textures";

/**
 * ThreeBody — live restricted three-body integration (Ephemeris hero).
 *
 * Three softened-gravity point masses integrated with velocity-Verlet
 * (Plummer epsilon so close passes don't blow up; a gentle central spring
 * keeps the composition framed; a guard re-seeds if it flies apart).
 *
 * Each body draws a TRAIL-point line whose per-vertex colour fades from
 * near-black (oldest) to full colour (newest); with ADDITIVE blending the
 * older tail reads as fainter and crossings glow. Each head is a small sphere
 * plus a glow sprite whose scale/opacity tracks the body's velocity.
 * Body colours: bone / amber / slate — no neon. Transparent clear.
 */

const G = 1.25;
const EPS2 = 0.32 * 0.32;
const SPRING = 0.016;
const MASS = [1.12, 1.0, 0.9];
const BODY_COLORS = [PALETTE.bone, PALETTE.amber, PALETTE.slate];
const RESET_DIST = 8.5;
const RESET_SPEED = 5.2;
const TRAIL = 256; // 3 bodies × 256 = 768 trail vertices

type SimState = {
  pos: THREE.Vector3[];
  vel: THREE.Vector3[];
  acc: THREE.Vector3[];
  nacc: THREE.Vector3[];
  d: THREE.Vector3;
};

function makeState(): SimState {
  const v3 = () => new THREE.Vector3();
  return {
    pos: [v3(), v3(), v3()],
    vel: [v3(), v3(), v3()],
    acc: [v3(), v3(), v3()],
    nacc: [v3(), v3(), v3()],
    d: v3(),
  };
}

function seed(s: SimState) {
  const R = 2.35;
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3 + (Math.random() - 0.5) * 0.5;
    const r = R * (0.85 + Math.random() * 0.3);
    s.pos[i].set(Math.cos(a) * r, (Math.random() - 0.5) * 0.7, Math.sin(a) * r);
    const v = 0.6 + Math.random() * 0.12;
    s.vel[i].set(-Math.sin(a) * v, (Math.random() - 0.5) * 0.08, Math.cos(a) * v);
    s.acc[i].set(0, 0, 0);
  }
  const mp = new THREE.Vector3();
  const mv = new THREE.Vector3();
  for (let i = 0; i < 3; i++) {
    mp.add(s.pos[i]);
    mv.add(s.vel[i]);
  }
  mp.multiplyScalar(1 / 3);
  mv.multiplyScalar(1 / 3);
  for (let i = 0; i < 3; i++) {
    s.pos[i].sub(mp);
    s.vel[i].sub(mv);
  }
}

function computeAcc(s: SimState, pos: THREE.Vector3[], out: THREE.Vector3[]) {
  for (let i = 0; i < 3; i++) out[i].set(0, 0, 0);
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      s.d.subVectors(pos[j], pos[i]);
      const r2 = s.d.lengthSq() + EPS2;
      const inv = 1 / (r2 * Math.sqrt(r2));
      const f = G * inv;
      out[i].addScaledVector(s.d, f * MASS[j]);
      out[j].addScaledVector(s.d, -f * MASS[i]);
    }
    out[i].addScaledVector(pos[i], -SPRING);
  }
}

function Bodies() {
  const glow = useMemo(() => makeGlowTexture(), []);
  const meshes = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];
  const sprites = [
    useRef<THREE.Sprite>(null),
    useRef<THREE.Sprite>(null),
    useRef<THREE.Sprite>(null),
  ];
  const geoms = [
    useRef<THREE.BufferGeometry>(null),
    useRef<THREE.BufferGeometry>(null),
    useRef<THREE.BufferGeometry>(null),
  ];

  const { camera } = useThree();
  const parallax = useRef(new THREE.Vector2(0, 0));

  // Per-body trail position buffers + static age-gradient colour buffers.
  const trails = useMemo(() => {
    const s = makeState();
    seed(s);
    computeAcc(s, s.pos, s.acc);
    const col = new THREE.Color();
    return BODY_COLORS.map((hex, b) => {
      const positions = new Float32Array(TRAIL * 3);
      const colors = new Float32Array(TRAIL * 3);
      const base = col.set(hex);
      for (let i = 0; i < TRAIL; i++) {
        // seed the whole trail at the body's start point
        positions[i * 3] = s.pos[b].x;
        positions[i * 3 + 1] = s.pos[b].y;
        positions[i * 3 + 2] = s.pos[b].z;
        // age gradient: index 0 = oldest (near-black), last = newest (full).
        const age = i / (TRAIL - 1);
        const k = age * age; // ease so only the recent tail is bright
        colors[i * 3] = base.r * k;
        colors[i * 3 + 1] = base.g * k;
        colors[i * 3 + 2] = base.b * k;
      }
      return { positions, colors };
    });
  }, []);

  const state = useMemo(() => {
    const s = makeState();
    seed(s);
    computeAcc(s, s.pos, s.acc);
    return s;
  }, []);

  useFrame((st, delta) => {
    const s = state;
    const SUB = 5;
    const h = Math.min(delta, 0.033) / SUB;

    for (let step = 0; step < SUB; step++) {
      const hh = 0.5 * h * h;
      for (let i = 0; i < 3; i++) {
        s.pos[i].addScaledVector(s.vel[i], h).addScaledVector(s.acc[i], hh);
      }
      computeAcc(s, s.pos, s.nacc);
      for (let i = 0; i < 3; i++) {
        s.vel[i]
          .addScaledVector(s.acc[i], 0.5 * h)
          .addScaledVector(s.nacc[i], 0.5 * h);
        s.acc[i].copy(s.nacc[i]);
      }
    }

    // Guard: gently re-seed if it escapes or overheats.
    let maxD = 0;
    let maxV = 0;
    for (let i = 0; i < 3; i++) {
      maxV = Math.max(maxV, s.vel[i].length());
      for (let j = i + 1; j < 3; j++) {
        maxD = Math.max(maxD, s.pos[i].distanceTo(s.pos[j]));
      }
    }
    if (maxD > RESET_DIST || maxV > RESET_SPEED) {
      seed(s);
      computeAcc(s, s.pos, s.acc);
    }

    // Advance each trail (shift left, append head) + move head sprites.
    for (let b = 0; b < 3; b++) {
      const p = trails[b].positions;
      p.copyWithin(0, 3); // drop oldest vertex
      const last = (TRAIL - 1) * 3;
      p[last] = s.pos[b].x;
      p[last + 1] = s.pos[b].y;
      p[last + 2] = s.pos[b].z;
      const g = geoms[b].current;
      if (g) {
        const attr = g.getAttribute("position") as THREE.BufferAttribute;
        attr.needsUpdate = true;
      }
      const m = meshes[b].current;
      if (m) m.position.copy(s.pos[b]);
      const sp = sprites[b].current;
      if (sp) {
        sp.position.copy(s.pos[b]);
        // emissive-like: scale + opacity track velocity.
        const speed = s.vel[b].length();
        const e = 0.55 + Math.min(speed / RESET_SPEED, 1) * 1.1;
        sp.scale.setScalar(1.25 * e);
        const mat = sp.material as THREE.SpriteMaterial;
        mat.opacity = 0.4 + Math.min(speed / RESET_SPEED, 1) * 0.5;
      }
    }

    // Gentle auto-orbit + subtle pointer parallax.
    const t = st.clock.elapsedTime;
    parallax.current.lerp(st.pointer, 0.05);
    const rad = 5.7; // pulled in — bodies read larger in the frame
    const cx = Math.sin(t * 0.07) * rad + parallax.current.x * 1.3;
    const cz = Math.cos(t * 0.07) * rad;
    const cy = 1.85 - parallax.current.y * 1.0;
    camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.045);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {BODY_COLORS.map((_col, b) => (
        <line key={`t${b}`}>
          <bufferGeometry ref={geoms[b]}>
            <bufferAttribute
              attach="attributes-position"
              args={[trails[b].positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[trails[b].colors, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            vertexColors
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </line>
      ))}
      {BODY_COLORS.map((col, b) => (
        <mesh key={`b${b}`} ref={meshes[b]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshBasicMaterial color={col} toneMapped={false} />
        </mesh>
      ))}
      {BODY_COLORS.map((col, b) => (
        <sprite key={`s${b}`} ref={sprites[b]} scale={[1.4, 1.4, 1.4]}>
          <spriteMaterial
            map={glow}
            color={col}
            transparent
            opacity={0.7}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
      ))}
    </>
  );
}

export default function ThreeBodyScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.85, 5.7], fov: 54 }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Bodies />
    </Canvas>
  );
}
