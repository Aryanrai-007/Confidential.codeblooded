'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useDetectGPU } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useBeatStore } from '@/lib/beat-store';

type Props = { onReady: () => void; reducedMotion: boolean };

function makeReliefTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.fillStyle = '#651020';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 180; i += 1) {
    const x = (i * 83) % 512;
    const y = (i * 137) % 512;
    ctx.strokeStyle = i % 3 === 0 ? 'rgba(255,90,112,.25)' : 'rgba(10,0,0,.34)';
    ctx.lineWidth = i % 4 === 0 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + 24, y - 30, x - 15, y + 28, x + 34, y + 42);
    ctx.stroke();
  }
  for (let i = 0; i < 2600; i += 1) {
    const alpha = Math.random() * 0.1;
    ctx.fillStyle = `rgba(255,220,210,${alpha})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 1.4, 1.4);
  }
  return new THREE.CanvasTexture(canvas);
}

function HeartMesh({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const materialTexture = useMemo(() => makeReliefTexture(), []);
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.95);
    shape.bezierCurveTo(-0.12, -0.72, -1.12, -0.12, -1.12, 0.62);
    shape.bezierCurveTo(-1.12, 1.28, -0.35, 1.48, 0, 0.86);
    shape.bezierCurveTo(0.35, 1.48, 1.12, 1.28, 1.12, 0.62);
    shape.bezierCurveTo(1.12, -0.12, 0.12, -0.72, 0, -0.95);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.24, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.075, bevelThickness: 0.08, curveSegments: 28 });
  }, []);

  useEffect(() => () => { geometry.dispose(); materialTexture.dispose(); }, [geometry, materialTexture]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const beat = useBeatStore.getState().beat;
    const envelope = reducedMotion ? 0 : Math.max(0, Math.sin(t * Math.PI * 2 * 1.1)) ** 18 * 0.055 + Math.max(0, Math.sin(t * Math.PI * 2 * 1.1 - 0.42)) ** 22 * 0.035;
    mesh.current.scale.setScalar(1 + envelope);
    mesh.current.rotation.y = reducedMotion ? -0.14 : -0.14 + Math.sin(t * 0.35) * 0.11;
    mesh.current.rotation.z = reducedMotion ? 0 : Math.sin(t * 0.22) * 0.025;
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.18 + (reducedMotion ? 0 : beat * 0.28);
  });

  return (
    <mesh ref={mesh} geometry={geometry} castShadow receiveShadow rotation={[0, -0.14, 0]}>
      <meshStandardMaterial map={materialTexture} color="#C41E3A" roughness={0.42} metalness={0.24} emissive="#650919" emissiveIntensity={0.2} />
    </mesh>
  );
}

function Scene({ onReady, reducedMotion }: Props) {
  const setBeat = useBeatStore((state) => state.setBeat);
  useFrame(({ clock }) => {
    const cycle = (clock.elapsedTime % (60 / 66)) / (60 / 66);
    const first = Math.max(0, Math.sin(cycle * Math.PI * 2)) ** 10;
    const second = Math.max(0, Math.sin((cycle - 0.2) * Math.PI * 2)) ** 12;
    setBeat(Math.min(1, first * 0.72 + second * 0.46));
  });
  useEffect(() => { onReady(); }, [onReady]);

  return (
    <>
      <ambientLight intensity={0.55} />
      <spotLight position={[2, 3, 4]} intensity={24} angle={0.55} penumbra={0.7} color="#F2B9BE" castShadow />
      <pointLight position={[-3, -1, 2]} intensity={8} color="#E5395A" />
      <pointLight position={[2, 0, -2]} intensity={10} color="#6D071B" />
      <Float speed={reducedMotion ? 0 : 0.55} rotationIntensity={reducedMotion ? 0 : 0.08} floatIntensity={reducedMotion ? 0 : 0.13}>
        <HeartMesh reducedMotion={reducedMotion} />
      </Float>
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.62} luminanceThreshold={0.55} luminanceSmoothing={0.24} mipmapBlur />
        <Vignette eskil={false} offset={0.22} darkness={0.75} />
      </EffectComposer>
    </>
  );
}

export default function HeartScene(props: Props) {
  const gpu = useDetectGPU();
  const dpr = gpu.tier <= 1 ? 1 : gpu.tier === 2 ? 1.25 : 1.5;
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 4.8], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.outputColorSpace = THREE.SRGBColorSpace; }}
      fallback={<div className="scene-fallback"><span className="fallback-heart" /></div>}
    >
      <Suspense fallback={null}><Scene {...props} /></Suspense>
    </Canvas>
  );
}
