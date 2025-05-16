import { useContext } from 'react';
import { CanvasContext } from '../../context/CanvasContext';

/**
 * Custom hook to access the Canvas context
 * @returns {Object} Canvas context value
 */
export function useCanvasHook() {
  try {
    const context = useContext(CanvasContext);
    if (!context) {
      throw new Error('useCanvasHook must be used within a CanvasProvider');
    }
    return context;
  } catch (error) {
    console.error("Error in useCanvasHook:", error);
    // Return a fallback empty object to prevent further errors
    return { canvasEditorStore: null, setCanvasEditorStore: () => {} };
  }
}

export default useCanvasHook;
