"use client"
import { useState, useCallback, createContext, useContext } from 'react';

// Create a context with a default value to prevent undefined errors
export const CanvasContext = createContext({
  CanvasEditorStore: null,
  setCanvasEditorStore: () => {},
  selectedElement: null,
  setSelectedElement: () => {},
  isCanvasModified: false,
  undo: () => {},
  redo: () => {},
  saveCanvas: () => null,
  addElement: () => {},
  removeElement: () => {}
});

// Provider component
export const CanvasProvider = ({ children }) => {
  const [CanvasEditorStore, setCanvasEditorStore] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isCanvasModified, setIsCanvasModified] = useState(false);
  
  // Save current state to history
  const saveToHistory = useCallback(() => {
    try {
      if (!CanvasEditorStore) return;
      
      const currentState = CanvasEditorStore.toJSON();
      const newHistory = canvasHistory.slice(0, historyIndex + 1);
      newHistory.push(currentState);
      
      setCanvasHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  }, [CanvasEditorStore, canvasHistory, historyIndex]);

  // Undo operation
  const undo = useCallback(() => {
    if (historyIndex <= 0 || !CanvasEditorStore) return;
    
    const newIndex = historyIndex - 1;
    CanvasEditorStore.loadFromJSON(canvasHistory[newIndex], () => {
      CanvasEditorStore.renderAll();
      setHistoryIndex(newIndex);
      setIsCanvasModified(true);
    });
  }, [CanvasEditorStore, canvasHistory, historyIndex]);

  // Redo operation
  const redo = useCallback(() => {
    if (historyIndex >= canvasHistory.length - 1 || !CanvasEditorStore) return;
    
    const newIndex = historyIndex + 1;
    CanvasEditorStore.loadFromJSON(canvasHistory[newIndex], () => {
      CanvasEditorStore.renderAll();
      setHistoryIndex(newIndex);
      setIsCanvasModified(true);
    });
  }, [CanvasEditorStore, canvasHistory, historyIndex]);

  // Save canvas
  const saveCanvas = useCallback(() => {
    if (!CanvasEditorStore) return null;
    
    const canvasData = CanvasEditorStore.toJSON();
    setIsCanvasModified(false);
    return canvasData;
  }, [CanvasEditorStore]);

  // Add element to canvas
  const addElement = useCallback((elementType, options = {}) => {
    if (!CanvasEditorStore) return;
    
    // Add element logic here based on elementType
    
    setIsCanvasModified(true);
    saveToHistory();
  }, [CanvasEditorStore, saveToHistory]);

  // Remove selected element
  const removeElement = useCallback(() => {
    if (!CanvasEditorStore || !selectedElement) return;
    
    CanvasEditorStore.remove(selectedElement);
    setSelectedElement(null);
    setIsCanvasModified(true);
    saveToHistory();
  }, [CanvasEditorStore, selectedElement, saveToHistory]);

  const value = {
    CanvasEditorStore,
    setCanvasEditorStore,
    selectedElement,
    setSelectedElement,
    isCanvasModified,
    undo,
    redo,
    saveCanvas,
    addElement,
    removeElement
  };

  // Custom hook to use the canvas context with better error handling
  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
};

// Custom hook to use the canvas context
export const useCanvasHook = () => {
  try {
    const context = useContext(CanvasContext);
    if (context === undefined) {
      console.warn('useCanvasHook was used outside of a CanvasProvider');
      // Return default values instead of throwing
      return {
        CanvasEditorStore: null,
        setCanvasEditorStore: () => {},
        selectedElement: null,
        setSelectedElement: () => {},
        isCanvasModified: false,
        undo: () => {},
        redo: () => {},
        saveCanvas: () => null,
        addElement: () => {},
        removeElement: () => {}
      };
    }
    return context;
  } catch (error) {
    console.error("Error in useCanvasHook:", error);
    // Return default values on error
    return {
      CanvasEditorStore: null,
      setCanvasEditorStore: () => {},
      selectedElement: null,
      setSelectedElement: () => {},
      isCanvasModified: false,
      undo: () => {},
      redo: () => {},
      saveCanvas: () => null,
      addElement: () => {},
      removeElement: () => {}
    };
  }
};
