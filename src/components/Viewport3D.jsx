import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { Camera, ZoomIn, ZoomOut, RotateCcw, RotateCw } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

function SpinningPreview() {
  const ref = useRef();
  const { lodLevel, selectedColor } = useEditorStore();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });
  return (
    <group ref={ref}>
      {/* Level of detail demonstration */}
      {lodLevel <= 1 && (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color={selectedColor} roughness={0.5} metalness={0.2} />
        </mesh>
      )}
      {lodLevel === 2 && (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.1, 24, 24]} />
          <meshStandardMaterial color={selectedColor} roughness={0.4} metalness={0.3} />
        </mesh>
      )}
      {lodLevel >= 3 && (
        <mesh castShadow receiveShadow>
          <torusKnotGeometry args={[0.9, 0.25, 128, 32]} />
          <meshStandardMaterial color={selectedColor} roughness={0.35} metalness={0.45} />
        </mesh>
      )}
    </group>
  );
}

export default function Viewport3D() {
  const { resetCamera, zoom, lodLevel, setLOD, pushHistory, popHistory, redoHistory, canUndo, canRedo } = useEditorStore();
  const controlsRef = useRef();

  useEffect(() => {
    // Example: push an initial state into history for undo/redo demonstration
    pushHistory({ type: 'init' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-full w-full bg-[#0f0f0f]">
      <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
        <button onClick={() => resetCamera(controlsRef.current)} className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 flex items-center gap-1 text-xs">
          <Camera size={14} /> Reset Camera
        </button>
        <button onClick={() => zoom(controlsRef.current, 0.9)} className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 flex items-center gap-1 text-xs">
          <ZoomIn size={14} />
        </button>
        <button onClick={() => zoom(controlsRef.current, 1.1)} className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 flex items-center gap-1 text-xs">
          <ZoomOut size={14} />
        </button>
        <div className="ml-2 text-xs text-gray-400">LOD</div>
        <input type="range" min={1} max={3} value={lodLevel} onChange={(e) => setLOD(Number(e.target.value))} />
      </div>
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <button disabled={!canUndo} onClick={() => popHistory()} className={`px-2 py-1 rounded border border-gray-800 flex items-center gap-1 text-xs ${canUndo ? 'bg-[#1a1a1a] hover:bg-[#202020]' : 'bg-[#111] text-gray-600'}`}>
          <RotateCcw size={14} />
        </button>
        <button disabled={!canRedo} onClick={() => redoHistory()} className={`px-2 py-1 rounded border border-gray-800 flex items-center gap-1 text-xs ${canRedo ? 'bg-[#1a1a1a] hover:bg-[#202020]' : 'bg-[#111] text-gray-600'}`}>
          <RotateCw size={14} />
        </button>
      </div>
      <Canvas shadows camera={{ position: [3, 2, 4], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <Environment preset="city" />
        <Grid infiniteGrid sectionColor="#1f1f1f" cellColor="#181818" fadeDistance={50} fadeStrength={1} position={[0, -1, 0]} />
        <SpinningPreview />
        <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.1} />
      </Canvas>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#141414]/80 border border-gray-800 text-xs">
        Tip: Use right-click + drag to orbit, middle-click to pan, scroll to zoom.
      </div>
    </div>
  );
}
