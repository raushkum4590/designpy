import { createContext } from 'react';

export const CanvasContext = createContext({
  canvasEditorStore: null,
  setCanvasEditorStore: () => {},
});
