import React from 'react';
import { useEditorStore } from '../store/editorStore';

const Panel = ({ title, children }) => (
  <div className="border-b border-gray-800">
    <div className="px-3 py-2 text-xs tracking-wider font-semibold text-gray-300 uppercase">{title}</div>
    <div className="px-3 pb-3 space-y-2">{children}</div>
  </div>
);

export default function RightSidebar() {
  const {
    selectedColor,
    setSelectedColor,
    material,
    setMaterialProp,
    mesh,
    setMeshProp,
    exportOptions,
    setExportOption,
    aiParams,
    setAIParam,
  } = useEditorStore();

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <Panel title="Properties">
        <div>
          <label className="text-[11px] text-gray-400">Name</label>
          <input className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm" defaultValue={mesh.name} onBlur={(e) => setMeshProp('name', e.target.value)} />
        </div>
      </Panel>

      <Panel title="Material (PBR)">
        <div>
          <label className="text-[11px] text-gray-400">Base Color</label>
          <input type="color" className="w-full h-9 p-1 bg-[#111] border border-gray-800 rounded" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-gray-400">Metalness</label>
            <input type="range" min={0} max={1} step={0.01} value={material.metalness} onChange={(e) => setMaterialProp('metalness', Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-[11px] text-gray-400">Roughness</label>
            <input type="range" min={0} max={1} step={0.01} value={material.roughness} onChange={(e) => setMaterialProp('roughness', Number(e.target.value))} className="w-full" />
          </div>
        </div>
        <div>
          <label className="text-[11px] text-gray-400">Normal Map</label>
          <input type="file" className="w-full text-xs" accept="image/*" onChange={(e) => setMaterialProp('normalMap', e.target.files?.[0] || null)} />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">Specular Map</label>
          <input type="file" className="w-full text-xs" accept="image/*" onChange={(e) => setMaterialProp('specularMap', e.target.files?.[0] || null)} />
        </div>
      </Panel>

      <Panel title="AI Generation">
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
            <label className="text-[11px] text-gray-400">Detail</label>
            <input type="range" min={0} max={100} value={aiParams.detail} onChange={(e) => setAIParam('detail', Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </Panel>

      <Panel title="Mesh Resolution">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-gray-400">Target Tris</label>
            <input type="number" className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm" value={mesh.targetTris} onChange={(e) => setMeshProp('targetTris', Number(e.target.value))} />
          </div>
          <div>
            <label className="text-[11px] text-gray-400">Subdivision</label>
            <input type="number" className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm" value={mesh.subdivision} onChange={(e) => setMeshProp('subdivision', Number(e.target.value))} />
          </div>
        </div>
      </Panel>

      <Panel title="Export">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-gray-400">Format</label>
            <select className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm" value={exportOptions.format} onChange={(e) => setExportOption('format', e.target.value)}>
              <option>OBJ</option>
              <option>FBX</option>
              <option>STL</option>
              <option>glTF</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] text-gray-400">Texture Res</label>
            <select className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm" value={exportOptions.texRes} onChange={(e) => setExportOption('texRes', e.target.value)}>
              <option>512</option>
              <option>1024</option>
              <option>2048</option>
              <option>4096</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-[11px] text-gray-400">Poly Count</label>
          <input type="number" className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm" value={exportOptions.polyCount} onChange={(e) => setExportOption('polyCount', Number(e.target.value))} />
        </div>
      </Panel>

      <div className="px-3 py-3 text-[11px] text-gray-500">Interactive tutorials, tooltips, and documentation are accessible from the Help menu in the top bar. Real-time collaboration and cloud saving are also supported.</div>
    </div>
  );
}
