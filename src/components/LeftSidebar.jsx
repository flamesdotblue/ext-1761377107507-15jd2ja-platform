import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useEditorStore } from '../store/editorStore';
import { Wand2, Image as ImageIcon, Type, Brush, Droplet, Bone, Scissors, Shapes, Upload, Film, Play, Pause } from 'lucide-react';

const Section = ({ title, icon, children }) => (
  <div className="border-b border-gray-800">
    <div className="px-3 py-2 text-xs tracking-wider font-semibold text-gray-300 flex items-center gap-2 uppercase">
      {icon}
      <span>{title}</span>
    </div>
    <div className="px-3 pb-3 space-y-2">
      {children}
    </div>
  </div>
);

export default function LeftSidebar() {
  const {
    tool,
    setTool,
    aiParams,
    setAIParam,
    startTextTo3D,
    startImageTo3D,
    imageParams,
    setImageParam,
    animation,
    setAnimation,
    isPlaying,
    setIsPlaying,
  } = useEditorStore();

  const onDrop = (files) => {
    startImageTo3D(files[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.tif', '.tiff'] },
    multiple: false,
  });

  const IconWrap = useMemo(() => ({
    AI: <Wand2 size={16} style={{ color: '#26A69A' }} />,
    IMG: <ImageIcon size={16} style={{ color: '#26A69A' }} />,
    TXT: <Type size={16} style={{ color: '#26A69A' }} />,
    BR: <Brush size={16} style={{ color: '#26A69A' }} />,
    PX: <Droplet size={16} style={{ color: '#26A69A' }} />,
    RG: <Bone size={16} style={{ color: '#26A69A' }} />,
    BOOL: <Scissors size={16} style={{ color: '#26A69A' }} />,
    MSH: <Shapes size={16} style={{ color: '#26A69A' }} />,
    AN: <Film size={16} style={{ color: '#26A69A' }} />,
  }), []);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="p-2 grid grid-cols-4 gap-2 border-b border-gray-800">
        {[
          { id: 'text', label: 'Text→3D', icon: IconWrap.TXT },
          { id: 'image', label: 'Image→3D', icon: IconWrap.IMG },
          { id: 'sculpt', label: 'Sculpt', icon: IconWrap.BR },
          { id: 'paint', label: 'Paint', icon: IconWrap.PX },
          { id: 'rig', label: 'Rig', icon: IconWrap.RG },
          { id: 'animate', label: 'Animate', icon: IconWrap.AN },
          { id: 'mesh', label: 'Mesh Ops', icon: IconWrap.MSH },
          { id: 'boolean', label: 'Boolean', icon: IconWrap.BOOL },
        ].map(t => (
          <button key={t.id} onClick={() => setTool(t.id)} className={`text-[11px] px-2 py-2 rounded border ${tool === t.id ? 'border-[#26A69A] bg-[#0f2321]' : 'border-gray-800 bg-[#141414] hover:bg-[#191919]'} flex flex-col items-center gap-1`}>
            {t.icon}
            <span className="truncate w-full text-center">{t.label}</span>
          </button>
        ))}
      </div>

      {tool === 'text' && (
        <Section title="Text to 3D" icon={IconWrap.AI}>
          <textarea className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm outline-none focus:ring-1" placeholder="A photorealistic red sports car with detailed rims..." value={aiParams.prompt} onChange={(e) => setAIParam('prompt', e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-gray-400">Style</label>
              <select className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm" value={aiParams.style} onChange={(e) => setAIParam('style', e.target.value)}>
                <option>Photorealistic</option>
                <option>Stylized</option>
                <option>Abstract</option>
                <option>Low-poly</option>
                <option>Hand-painted</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-gray-400">Complexity</label>
              <input type="range" min={0} max={100} value={aiParams.complexity} onChange={(e) => setAIParam('complexity', Number(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-400">{aiParams.complexity}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-gray-400">Detail</label>
              <input type="range" min={0} max={100} value={aiParams.detail} onChange={(e) => setAIParam('detail', Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-[11px] text-gray-400">Poly Budget</label>
              <input type="number" className="w-full bg-[#111] border border-gray-800 rounded p-1 text-sm" value={aiParams.polyBudget} onChange={(e) => setAIParam('polyBudget', Number(e.target.value))} />
            </div>
            <div>
              <label className="text-[11px] text-gray-400">Seed</label>
              <input type="number" className="w-full bg-[#111] border border-gray-800 rounded p-1 text-sm" value={aiParams.seed ?? ''} onChange={(e) => setAIParam('seed', e.target.value === '' ? null : Number(e.target.value))} />
            </div>
          </div>
          <button onClick={() => startTextTo3D()} className="w-full px-3 py-2 rounded bg-[#0f2321] border border-[#26A69A] text-sm flex items-center justify-center gap-2">
            <Wand2 size={16} /> Generate
          </button>
        </Section>
      )}

      {tool === 'image' && (
        <Section title="Image to 3D" icon={IconWrap.IMG}>
          <div {...getRootProps()} className={`w-full p-3 border-2 border-dashed rounded cursor-pointer ${isDragActive ? 'border-[#26A69A] bg-[#0f2321]' : 'border-gray-700 bg-[#111]'}`}>
            <input {...getInputProps()} />
            <div className="text-center text-sm text-gray-400 flex flex-col items-center gap-2">
              <Upload size={18} />
              <div>Drop an image here (JPG, PNG, TIFF) or click to select.</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-gray-400">Depth Estimation</label>
              <input type="range" min={0} max={100} value={imageParams.depth} onChange={(e) => setImageParam('depth', Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-[11px] text-gray-400">Mesh Density</label>
              <input type="range" min={0} max={100} value={imageParams.density} onChange={(e) => setImageParam('density', Number(e.target.value))} className="w-full" />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-gray-400">Texture Detail</label>
            <input type="range" min={0} max={100} value={imageParams.textureDetail} onChange={(e) => setImageParam('textureDetail', Number(e.target.value))} className="w-full" />
          </div>
        </Section>
      )}

      {tool === 'sculpt' && (
        <Section title="Sculpting" icon={IconWrap.BR}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-gray-400">Brush Size</label>
              <input type="range" min={1} max={200} value={useEditorStore.getState().sculpt.brushSize} onChange={(e) => useEditorStore.getState().setSculpt('brushSize', Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-[11px] text-gray-400">Strength</label>
              <input type="range" min={0} max={1} step={0.01} value={useEditorStore.getState().sculpt.strength} onChange={(e) => useEditorStore.getState().setSculpt('strength', Number(e.target.value))} className="w-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm" onClick={() => useEditorStore.getState().applySmoothing()}>Smooth</button>
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm" onClick={() => useEditorStore.getState().subdivide()}>Subdivide</button>
          </div>
        </Section>
      )}

      {tool === 'paint' && (
        <Section title="Texture Painting" icon={IconWrap.PX}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-gray-400">Brush Size</label>
              <input type="range" min={1} max={200} value={useEditorStore.getState().paint.brushSize} onChange={(e) => useEditorStore.getState().setPaint('brushSize', Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-[11px] text-gray-400">Opacity</label>
              <input type="range" min={0} max={1} step={0.01} value={useEditorStore.getState().paint.opacity} onChange={(e) => useEditorStore.getState().setPaint('opacity', Number(e.target.value))} className="w-full" />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-gray-400">Layer</label>
            <select className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm" value={useEditorStore.getState().paint.layer} onChange={(e) => useEditorStore.getState().setPaint('layer', e.target.value)}>
              <option>Diffuse</option>
              <option>Specular</option>
              <option>Normal</option>
              <option>Roughness</option>
            </select>
          </div>
        </Section>
      )}

      {tool === 'rig' && (
        <Section title="Rigging" icon={IconWrap.RG}>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm" onClick={() => useEditorStore.getState().createBone()}>Create Bone</button>
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm" onClick={() => useEditorStore.getState().autoSkin()}>Auto Skin</button>
          </div>
          <div className="text-xs text-gray-400">Supports IK and importing BVH/FBX mocap.</div>
        </Section>
      )}

      {tool === 'animate' && (
        <Section title="Animation" icon={IconWrap.AN}>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm flex items-center gap-1" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />} {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
          <div>
            <label className="text-[11px] text-gray-400">Timeline</label>
            <input type="range" min={0} max={animation.duration} value={animation.time} onChange={(e) => setAnimation('time', Number(e.target.value))} className="w-full" />
            <div className="text-xs text-gray-400">{animation.time.toFixed(2)}s / {animation.duration.toFixed(2)}s</div>
          </div>
        </Section>
      )}

      {(tool === 'mesh' || tool === 'boolean') && (
        <Section title="Mesh Operations" icon={IconWrap.MSH}>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm" onClick={() => useEditorStore.getState().booleanOp('union')}>Boolean Union</button>
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm" onClick={() => useEditorStore.getState().booleanOp('subtract')}>Boolean Subtract</button>
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm" onClick={() => useEditorStore.getState().simplify()}>Simplify</button>
            <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-sm" onClick={() => useEditorStore.getState().retopo()}>Retopology</button>
          </div>
        </Section>
      )}
    </div>
  );
}
