import React, { useEffect, useState } from 'react'
import { useCanvasHook } from '../../hooks';
import { FontFamilyList } from '../option'
import { Check, ChevronDown } from 'lucide-react'

function FontFamiy() {
  const { CanvasEditorStore } = useCanvasHook();
  const [currentFont, setCurrentFont] = useState('Arial');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Initial font detection
  useEffect(() => {
    if (CanvasEditorStore) {
      const activeObject = CanvasEditorStore.getActiveObject();
      if (activeObject && (activeObject.type === 'textbox' || activeObject.type === 'text')) {
        setCurrentFont(activeObject.fontFamily || 'Arial');
      }
    }
  }, [CanvasEditorStore]);

  // Listen for selection changes
  useEffect(() => {
    if (CanvasEditorStore) {
      const handleSelectionUpdated = () => {
        const activeObject = CanvasEditorStore.getActiveObject();
        if (activeObject && (activeObject.type === 'textbox' || activeObject.type === 'text')) {
          setCurrentFont(activeObject.fontFamily || 'Arial');
        }
      };

      CanvasEditorStore.on('selection:created', handleSelectionUpdated);
      CanvasEditorStore.on('selection:updated', handleSelectionUpdated);
      
      return () => {
        CanvasEditorStore.off('selection:created', handleSelectionUpdated);
        CanvasEditorStore.off('selection:updated', handleSelectionUpdated);
      };
    }
  }, [CanvasEditorStore]);

  const handleFontChange = (fontFamily) => {
    if (!CanvasEditorStore) return;
    
    const activeObject = CanvasEditorStore.getActiveObject();
    if (!activeObject) return;
    
    // Apply font to text object
    try {
      // Set the font family
      activeObject.set({
        fontFamily: fontFamily
      });
      
      // Update state
      setCurrentFont(fontFamily);
      
      // If there's selected text within the textbox, apply font to it
      if (activeObject.isEditing && activeObject.selectionStart !== activeObject.selectionEnd) {
        activeObject.setSelectionStyles({ fontFamily: fontFamily });
      }
      
      // Render the changes
      CanvasEditorStore.requestRenderAll();
    } catch (error) {
      console.error("Error applying font family:", error);
    }
    
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <div 
        className="flex items-center justify-between p-2 border rounded-md cursor-pointer bg-white"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span style={{ fontFamily: currentFont }}>{currentFont}</span>
        <ChevronDown size={16} />
      </div>
      
      {showDropdown && (
        <div className="absolute z-[9999] w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {FontFamilyList.map((fontFamily, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
              style={{ fontFamily: fontFamily }}
              onClick={() => handleFontChange(fontFamily)}
            >
              <span>{fontFamily}</span>
              {currentFont === fontFamily && <Check size={16} className="text-blue-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FontFamiy