"use client"
import { useState, useCallback, createContext, useContext } from 'react';

// Create a context to hold canvas state
export const CanvasContext = createContext();

// Provider component
export const CanvasProvider = ({ children }) => {
  const [CanvasEditorStore, setCanvasEditorStore] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isCanvasModified, setIsCanvasModified] = useState(false);
  
  // Save current state to history
  const saveToHistory = useCallback(() => {
    if (!CanvasEditorStore) return;
    
    const currentState = CanvasEditorStore.toJSON();
    const newHistory = canvasHistory.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    
    setCanvasHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
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

  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
};

// Custom hook to use the canvas context
export const useCanvasHook = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvasHook must be used within a CanvasProvider');
  }
  return context;
};

// Default export for backward compatibility
export default useCanvasHook;
