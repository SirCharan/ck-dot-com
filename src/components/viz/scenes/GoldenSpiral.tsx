"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "../lib/textures";

/**
 * GoldenSpiral — a phyllotaxis particle field. Points are placed by the
 * golden angle (~137.5°) at radius ∝ √i, forming the sunflower packing, then
 * slowly rotated. Instanced for a single draw call. Calm and restrained.
 */

const COUNT = 720;
const GOLDEN = Math.PI * (3 - Math.sqrt(5)); // ~137.5°

function Field() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(0.028, 0), []);
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ toneMapped: false }),
    []
  );

  const { matrices, colors } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const cA = new THREE.Color(PALETTE.accent);
    const cB = new THREE.Color(PALETTE.green);
    const m: THREE.Matrix4[] = [];
    const c: THREE.Color[] = [];
    for (let i = 0; i < COUNT; i++) {
      const t = i / (COUNT - 1);
      const r = Math.sqrt(i) * 0.11;
      const a = i * GOLDEN;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = Math.sin(t * Math.PI) * -0.22; // faint dome
      dummy.position.set(x, y, z);
      const s = 0.55 + t * 1.1;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      m.push(dummy.matrix.clone());
      c.push(new THREE.Color().lerpColors(cA, cB, t));
    }
    return { matrices: m, colors: c };
  }, []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < COUNT; i++) {
      mesh.setMatrixAt(i, matrices[i]);
      mesh.setColorAt(i, colors[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [matrices, colors]);

  useEffect(() => {
    return () => {
      geo.dispose();
      mat.dispose();
    };
  }, [geo, mat]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef} rotation={[0.55, 0, 0]}>
      <instancedMesh ref={meshRef} args={[geo, mat, COUNT]} />
    </group>
  );
}

export default function GoldenSpiralScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.4, 4.6], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Field />
    </Canvas>
  );
}
