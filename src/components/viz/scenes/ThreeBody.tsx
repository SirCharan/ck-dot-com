"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import { makeGlowTexture, PALETTE } from "../lib/textures";

/**
 * ThreeBody — a softened-gravity three-body simulation.
 *
 * Three point masses are integrated with velocity-Verlet. Gravity is softened
 * (Plummer epsilon) so close passes never blow up to infinity, a gentle central
 * spring keeps the system framed, and a guard re-seeds a fresh, centred triangle
 * if it ever tries to fly apart — so the canvas is never blank.
 *
 * Each mass is a glowing sphere (additive halo sprite, no postprocessing) that
 * trails a fading luminous ribbon. The camera slowly auto-orbits and parallaxes
 * to the pointer. Transparent clear so the container / page background shows.
 */

const G = 1.25;
const EPS2 = 0.32 * 0.32; // softening squared
const SPRING = 0.016; // gentle pull toward centre
const MASS = [1.12, 1.0, 0.9];
const BODY_COLORS = [PALETTE.accent, PALETTE.green, PALETTE.pale];
const RESET_DIST = 8.5;
const RESET_SPEED = 5.2;

type SimState = {
  pos: THREE.Vector3[];
  vel: THREE.Vector3[];
  acc: THREE.Vector3[];
  nacc: THREE.Vector3[];
  d: THREE.Vector3; // scratch
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
  // Zero net momentum + centre position → system stays framed.
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
    // gentle central spring keeps the composition inside frame
    out[i].addScaledVector(pos[i], -SPRING);
  }
}

function Bodies() {
  const meshes = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];
  const glow = useMemo(() => makeGlowTexture(), []);
  const state = useMemo(() => {
    const s = makeState();
    seed(s);
    computeAcc(s, s.pos, s.acc);
    return s;
  }, []);
  const parallax = useRef(new THREE.Vector2(0, 0));
  const { camera } = useThree();

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
        s.vel[i].addScaledVector(s.acc[i], 0.5 * h).addScaledVector(s.nacc[i], 0.5 * h);
        s.acc[i].copy(s.nacc[i]);
      }
    }

    // Guard: re-seed gently if it flies apart or gets too hot.
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

    for (let i = 0; i < 3; i++) {
      const m = meshes[i].current;
      if (m) m.position.copy(s.pos[i]);
    }

    // Auto-orbit camera + subtle pointer parallax.
    const t = st.clock.elapsedTime;
    parallax.current.lerp(st.pointer, 0.05);
    const rad = 7.4;
    const cx = Math.sin(t * 0.075) * rad + parallax.current.x * 1.4;
    const cz = Math.cos(t * 0.075) * rad;
    const cy = 2.3 - parallax.current.y * 1.1;
    camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.045);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {BODY_COLORS.map((col, i) => (
        <Trail
          key={i}
          width={0.5}
          length={22}
          decay={1}
          color={col}
          attenuation={(w) => w * w}
          local={false}
        >
          <mesh ref={meshes[i]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshBasicMaterial color={col} toneMapped={false} />
            <sprite scale={[1.5, 1.5, 1.5]}>
              <spriteMaterial
                map={glow}
                color={col}
                transparent
                opacity={0.85}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </sprite>
          </mesh>
        </Trail>
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
      camera={{ position: [0, 2.3, 7.4], fov: 52 }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Bodies />
    </Canvas>
  );
}
