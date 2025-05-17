import React, { useEffect, useState } from 'react'
import ShapeSetting from './../Shareable/ShapeSetting'
import { useCanvasHook } from '../../hooks';

function TopNavBar() {
  const { CanvasEditorStore } = useCanvasHook();
  const [showShapeSetting, setShowShapeSetting] = useState(false);

  useEffect(() => {
    if(CanvasEditorStore){
      // Setup event handlers when canvas is available
      const handleSelection = () => {
        const activeObject = CanvasEditorStore.getActiveObject();
        
        // Show shape settings for any object that is not text
        if(activeObject && !(activeObject.type === 'textbox' || activeObject.type === 'text' || activeObject.Text)) {
          setShowShapeSetting(true);
        } else {
          setShowShapeSetting(false);
        }
      };

      // Handle initial selection
      handleSelection();

      // Set up event listeners
      CanvasEditorStore.on('selection:created', handleSelection);
      CanvasEditorStore.on('selection:updated', handleSelection);
      CanvasEditorStore.on('selection:cleared', () => {
        setShowShapeSetting(false);
      });

      // Cleanup function
      return () => {
        CanvasEditorStore.off('selection:created', handleSelection);
        CanvasEditorStore.off('selection:updated', handleSelection);
        CanvasEditorStore.off('selection:cleared');
      };
    }
  }, [CanvasEditorStore]);

  return (
    <div className='p-2 bg-white'>
        {showShapeSetting && <ShapeSetting/>}
    </div>
  )
}

export default TopNavBar