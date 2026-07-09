"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE } from "../lib/textures";

/**
 * Fractal — a full-screen animated Julia set rendered in a fragment shader on
 * a ScreenQuad. The Julia constant orbits and the zoom breathes, so it slowly
 * morphs. Colour is mapped strictly within the token palette (bg → cyan →
 * green → pale) so it reads as a calm, technical strip, never rainbow.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec3 uBg;
  uniform vec3 uAccent;
  uniform vec3 uGreen;
  uniform vec3 uPale;

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= uRes.x / uRes.y;

    float zoom = 1.55 + 0.35 * sin(uTime * 0.07);
    vec2 z = uv * zoom;

    float a = uTime * 0.045;
    vec2 c = vec2(cos(a), sin(a)) * 0.7885;

    float it = 0.0;
    const float MAX = 90.0;
    for (float i = 0.0; i < 90.0; i++) {
      z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
      if (dot(z, z) > 4.0) break;
      it += 1.0;
    }

    float m = it / MAX;
    // smooth ramp so bands don't harshly quantise
    float sm = pow(m, 0.8);

    vec3 col = mix(uBg, uAccent, smoothstep(0.02, 0.5, sm));
    col = mix(col, uGreen, smoothstep(0.42, 0.82, sm));
    col = mix(col, uPale, smoothstep(0.82, 1.0, sm) * 0.55);

    if (it >= MAX) col = uBg * 0.55; // interior

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FractalPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uBg: { value: new THREE.Color(PALETTE.bg) },
      uAccent: { value: new THREE.Color(PALETTE.accent) },
      uGreen: { value: new THREE.Color(PALETTE.green) },
      uPale: { value: new THREE.Color(PALETTE.pale) },
    }),
    []
  );

  useFrame((_, delta) => {
    const mat = ref.current;
    if (!mat) return;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
      />
    </ScreenQuad>
  );
}

export default function FractalScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <FractalPlane />
    </Canvas>
  );
}
