import { create } from 'zustand';

export const useEditorStore = create((set, get) => ({
  // Project
  projectName: 'Untitled',
  newProject: () => set({ projectName: 'Untitled' }),

  // Tooling
  tool: 'text',
  setTool: (tool) => set({ tool }),

  // Viewport
  lodLevel: 1,
  setLOD: (lod) => set({ lodLevel: lod }),
  selectedColor: '#26A69A',
  setSelectedColor: (c) => set({ selectedColor: c }),

  // Camera helpers
  resetCamera: (controls) => {
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(3, 2, 4);
      controls.update();
    }
  },
  zoom: (controls, factor) => {
    if (!controls) return;
    const cam = controls.object;
    cam.position.multiplyScalar(factor);
    controls.update();
  },

  // AI Generation
  aiParams: {
    prompt: '',
    style: 'Photorealistic',
    complexity: 50,
    detail: 50,
    polyBudget: 100000,
    seed: null,
  },
  setAIParam: (key, value) => set((s) => ({ aiParams: { ...s.aiParams, [key]: value } })),

  imageParams: {
    depth: 60,
    density: 50,
    textureDetail: 70,
  },
  setImageParam: (key, value) => set((s) => ({ imageParams: { ...s.imageParams, [key]: value } })),

  generation: { active: false, progress: 0 },
  generationTimer: null,

  startTextTo3D: () => {
    const { aiParams } = get();
    if (!aiParams.prompt) return;
    get()._startGenerationFlow();
  },
  startImageTo3D: () => {
    get()._startGenerationFlow();
  },
  _startGenerationFlow: () => {
    clearInterval(get().generationTimer);
    set({ generation: { active: true, progress: 0 } });
    const timer = setInterval(() => {
      const p = get().generation.progress + Math.max(1, Math.round(Math.random() * 6));
      if (p >= 100) {
        clearInterval(timer);
        set({ generation: { active: false, progress: 100 }, generationTimer: null });
        // Push a new history state to represent model update
        get().pushHistory({ type: 'gen-complete', at: Date.now() });
        setTimeout(() => set({ generation: { active: false, progress: 0 } }), 400);
      } else {
        set({ generation: { active: true, progress: p } });
      }
    }, 180);
    set({ generationTimer: timer });
  },
  cancelGeneration: () => {
    clearInterval(get().generationTimer);
    set({ generation: { active: false, progress: 0 }, generationTimer: null });
  },

  // Sculpting
  sculpt: { brushSize: 60, strength: 0.5 },
  setSculpt: (k, v) => set((s) => ({ sculpt: { ...s.sculpt, [k]: v } })),
  applySmoothing: () => get().pushHistory({ type: 'smooth' }),
  subdivide: () => get().pushHistory({ type: 'subdivide' }),

  // Painting
  paint: { brushSize: 40, opacity: 0.8, layer: 'Diffuse' },
  setPaint: (k, v) => set((s) => ({ paint: { ...s.paint, [k]: v } })),

  // Rigging
  createBone: () => get().pushHistory({ type: 'create-bone' }),
  autoSkin: () => get().pushHistory({ type: 'auto-skin' }),

  // Animation
  animation: { time: 0, duration: 5 },
  setAnimation: (k, v) => set((s) => ({ animation: { ...s.animation, [k]: v } })),
  isPlaying: false,
  setIsPlaying: (v) => set({ isPlaying: v }),

  // Mesh and Material
  mesh: { name: 'Preview Mesh', targetTris: 50000, subdivision: 0 },
  setMeshProp: (k, v) => set((s) => ({ mesh: { ...s.mesh, [k]: v } })),
  material: { metalness: 0.3, roughness: 0.5, normalMap: null, specularMap: null },
  setMaterialProp: (k, v) => set((s) => ({ material: { ...s.material, [k]: v } })),

  // Mesh ops
  booleanOp: (mode) => get().pushHistory({ type: 'boolean', mode }),
  simplify: () => get().pushHistory({ type: 'simplify' }),
  retopo: () => get().pushHistory({ type: 'retopo' }),

  // History (non-destructive editing)
  history: [],
  future: [],
  pushHistory: (entry) => set((s) => ({ history: [...s.history, entry], future: [] })),
  popHistory: () => set((s) => {
    if (s.history.length === 0) return {};
    const nxt = [...s.history];
    const last = nxt.pop();
    return { history: nxt, future: [last, ...s.future] };
  }),
  redoHistory: () => set((s) => {
    if (s.future.length === 0) return {};
    const [first, ...rest] = s.future;
    return { history: [...s.history, first], future: rest };
  }),
  get canUndo() {
    return get().history.length > 0;
  },
  get canRedo() {
    return get().future.length > 0;
  },
  undo: () => get().popHistory(),
  redo: () => get().redoHistory(),

  // Export
  exportOptions: { format: 'glTF', texRes: '2048', polyCount: 50000 },
  exporting: false,
  exportProgress: 0,
  exportTimer: null,
  setExportOption: (k, v) => set((s) => ({ exportOptions: { ...s.exportOptions, [k]: v } })),
  startExport: () => {
    clearInterval(get().exportTimer);
    set({ exporting: true, exportProgress: 0 });
    const timer = setInterval(() => {
      const p = get().exportProgress + Math.max(1, Math.round(Math.random() * 10));
      if (p >= 100) {
        clearInterval(timer);
        set({ exportProgress: 100 });
        setTimeout(() => set({ exporting: false, exportProgress: 0, exportTimer: null }), 300);
      } else {
        set({ exportProgress: p });
      }
    }, 200);
    set({ exportTimer: timer });
  },
  cancelExport: () => {
    clearInterval(get().exportTimer);
    set({ exporting: false, exportProgress: 0, exportTimer: null });
  },

  // Cloud + Collaboration (stubs)
  saveToCloud: () => console.log('Saving to cloud...'),
  openFromCloud: () => console.log('Opening from cloud...'),
  shareSession: () => console.log('Sharing session...'),
}));
