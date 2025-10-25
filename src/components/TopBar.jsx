import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { Rocket, Save, Upload, Download, Share2, Settings, HelpCircle, Users, Cloud, RotateCcw, RotateCw, FilePlus2 } from 'lucide-react';

const accent = { color: '#26A69A' };

export default function TopBar() {
  const {
    projectName,
    undo,
    redo,
    canUndo,
    canRedo,
    exporting,
    startExport,
    cancelExport,
    generation,
  } = useEditorStore();

  return (
    <div className="w-full border-b border-gray-800 bg-[#141414]/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-[2000px] mx-auto px-3 sm:px-4 py-2 flex items-center gap-2">
        <div className="flex items-center gap-2 mr-2">
          <Rocket size={20} style={accent} />
          <div className="font-semibold tracking-tight">Nebula 3D Studio</div>
          <div className="text-xs text-gray-400 ml-2">{projectName}</div>
        </div>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 flex items-center gap-1" onClick={() => useEditorStore.getState().newProject()}>
            <FilePlus2 size={16} /> <span className="hidden sm:inline">New</span>
          </button>
          <button className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 flex items-center gap-1" onClick={() => useEditorStore.getState().saveToCloud()}>
            <Save size={16} /> <span className="hidden sm:inline">Save</span>
          </button>
          <button className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 flex items-center gap-1" onClick={() => useEditorStore.getState().openFromCloud()}>
            <Cloud size={16} /> <span className="hidden sm:inline">Cloud</span>
          </button>
          <button className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 flex items-center gap-1" onClick={() => useEditorStore.getState().shareSession()}>
            <Share2 size={16} /> <span className="hidden md:inline">Share</span>
          </button>
        </div>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-1">
          <button disabled={!canUndo} onClick={undo} className={`px-2 py-1 rounded border border-gray-800 flex items-center gap-1 ${canUndo ? 'bg-[#1a1a1a] hover:bg-[#202020]' : 'bg-[#111111] text-gray-500'}`}>
            <RotateCcw size={16} /> Undo
          </button>
          <button disabled={!canRedo} onClick={redo} className={`px-2 py-1 rounded border border-gray-800 flex items-center gap-1 ${canRedo ? 'bg-[#1a1a1a] hover:bg-[#202020]' : 'bg-[#111111] text-gray-500'}`}>
            <RotateCw size={16} /> Redo
          </button>
        </div>
        <div className="flex items-center gap-1">
          {!exporting ? (
            <button onClick={() => startExport()} className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 flex items-center gap-1">
              <Download size={16} /> Export
            </button>
          ) : (
            <button onClick={() => cancelExport()} className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 text-red-400">Cancel Export</button>
          )}
          <button className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 hidden sm:flex items-center gap-1">
            <Settings size={16} />
          </button>
          <button className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 hidden sm:flex items-center gap-1">
            <HelpCircle size={16} />
          </button>
          <button className="px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 hidden sm:flex items-center gap-1">
            <Users size={16} />
          </button>
        </div>
      </div>
      {generation.active && (
        <div className="w-full bg-[#101010] border-t border-gray-800">
          <div className="max-w-[2000px] mx-auto px-4 py-1 text-xs text-gray-300 flex items-center gap-2">
            <Upload size={14} style={accent} /> Generating 3D model... {generation.progress}%
            <div className="flex-1 h-2 bg-[#0b0b0b] rounded overflow-hidden">
              <div className="h-full" style={{ width: `${generation.progress}%`, background: '#26A69A' }} />
            </div>
            <button onClick={() => useEditorStore.getState().cancelGeneration()} className="px-2 py-0.5 rounded bg-[#1a1a1a] hover:bg-[#202020] border border-gray-800 text-red-400">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
