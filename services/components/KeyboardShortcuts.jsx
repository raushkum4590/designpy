"use client"
import React, { useEffect } from 'react';
import { useCanvasHook } from '../../hooks';
import { fabric } from 'fabric';

import { toast } from 'sonner';

function KeyboardShortcuts() {
  const { 
    CanvasEditorStore, 
    undo, 
    redo, 
    saveCanvas, 
    selectedElement, 
    setSelectedElement,
    removeElement
  } = useCanvasHook();

  useEffect(() => {
    if (!CanvasEditorStore) return;

    const handleKeyDown = (e) => {
      // Get active object
      const activeObject = CanvasEditorStore.getActiveObject();
      const activeGroup = CanvasEditorStore.getActiveObjects();
      
      // Prevent handling when input fields are focused
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }      // CTRL + Z - Undo
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
        toast("Undo operation completed");
      }

      // CTRL + Y - Redo
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
        toast("Redo operation completed");
      }      // CTRL + S - Save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const data = saveCanvas();
        if (data) {
          toast("Your design has been saved");
        }
      }

      // Delete or Backspace - Remove selected element
      if ((e.key === 'Delete' || e.key === 'Backspace') && activeObject) {
        e.preventDefault();
        CanvasEditorStore.remove(activeObject);
        CanvasEditorStore.renderAll();
        toast("Selected element removed");
      }

      // CTRL + D - Duplicate selected element
      if (e.ctrlKey && e.key === 'd' && activeObject) {
        e.preventDefault();
        
        // Clone the object
        activeObject.clone((cloned) => {
          // Position the cloned object 20px to the right and down
          cloned.set({
            left: cloned.left + 20,
            top: cloned.top + 20,
            evented: true,
          });
          
          // Handle groups differently
          if (activeObject.type === 'activeSelection') {
            // For a group, we need to add each object individually and form a new group
            const activeSelection = cloned;
            const objects = activeSelection.getObjects();
            
            CanvasEditorStore.discardActiveObject();
            
            activeSelection.forEachObject((obj) => {
              CanvasEditorStore.add(obj);
            });
            
            // Form a new selection out of the cloned objects
            CanvasEditorStore.setActiveObject(activeSelection);
          } else {
            // Add the cloned object to the canvas
            CanvasEditorStore.add(cloned);
            CanvasEditorStore.setActiveObject(cloned);
          }
            CanvasEditorStore.renderAll();
          
          toast("Element duplicated successfully");
        });
      }

      // CTRL + A - Select all objects
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        const objects = CanvasEditorStore.getObjects();
        if (objects.length > 0) {
          CanvasEditorStore.discardActiveObject();
          
          const selection = new fabric.ActiveSelection(objects, {
            canvas: CanvasEditorStore,
          });
          
          CanvasEditorStore.setActiveObject(selection);
          CanvasEditorStore.renderAll();
        }
      }

      // Arrow keys - Move selected object
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && activeObject) {
        e.preventDefault();
        
        const MOVE_DISTANCE = e.shiftKey ? 10 : 1;
        
        switch (e.key) {
          case 'ArrowUp':
            activeObject.set('top', activeObject.top - MOVE_DISTANCE);
            break;
          case 'ArrowDown':
            activeObject.set('top', activeObject.top + MOVE_DISTANCE);
            break;
          case 'ArrowLeft':
            activeObject.set('left', activeObject.left - MOVE_DISTANCE);
            break;
          case 'ArrowRight':
            activeObject.set('left', activeObject.left + MOVE_DISTANCE);
            break;
        }
        
        CanvasEditorStore.renderAll();
      }

      // CTRL + G - Group selected objects
      if (e.ctrlKey && e.key === 'g' && activeGroup && activeGroup.length > 1) {
        e.preventDefault();
        
        const group = new fabric.Group(activeGroup, {
          originX: 'center',
          originY: 'center'
        });
        
        // Remove the selected objects and add the group
        activeGroup.forEach(obj => {
          CanvasEditorStore.remove(obj);
        });
          CanvasEditorStore.add(group);
        CanvasEditorStore.setActiveObject(group);
        CanvasEditorStore.renderAll();
        
        toast("Objects grouped successfully");
      }

      // CTRL + SHIFT + G - Ungroup selected group
      if (e.ctrlKey && e.shiftKey && e.key === 'G' && activeObject && activeObject.type === 'group') {
        e.preventDefault();
        
        const items = activeObject.getObjects();
        
        // Remove the group and add its constituent objects
        activeObject.destroy();
        CanvasEditorStore.remove(activeObject);
        
        items.forEach(obj => {
          CanvasEditorStore.add(obj);
        });
        
        // Select all the items
        const selection = new fabric.ActiveSelection(items, {
          canvas: CanvasEditorStore,
        });
          CanvasEditorStore.setActiveObject(selection);
        CanvasEditorStore.renderAll();
        
        toast("Group ungrouped successfully");
      }

      // CTRL + [ - Send backward
      if (e.ctrlKey && e.key === '[' && activeObject) {
        e.preventDefault();
        CanvasEditorStore.sendBackwards(activeObject);
        CanvasEditorStore.renderAll();
      }

      // CTRL + ] - Bring forward
      if (e.ctrlKey && e.key === ']' && activeObject) {
        e.preventDefault();
        CanvasEditorStore.bringForward(activeObject);
        CanvasEditorStore.renderAll();
      }

      // CTRL + SHIFT + [ - Send to back
      if (e.ctrlKey && e.shiftKey && e.key === '{' && activeObject) {
        e.preventDefault();
        CanvasEditorStore.sendToBack(activeObject);
        CanvasEditorStore.renderAll();
      }

      // CTRL + SHIFT + ] - Bring to front
      if (e.ctrlKey && e.shiftKey && e.key === '}' && activeObject) {
        e.preventDefault();
        CanvasEditorStore.bringToFront(activeObject);
        CanvasEditorStore.renderAll();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [CanvasEditorStore, undo, redo, saveCanvas, removeElement]);

  // This component doesn't render anything visible
  return null;
}

export default KeyboardShortcuts;
