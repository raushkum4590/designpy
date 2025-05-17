import React, { useState } from 'react'
import ColorPickerEditor from './ColorPickerEditor';
import { useCanvasHook } from '../../hooks';



function BorderColor() {
    const [color, setColor] = useState();
    const { CanvasEditorStore } = useCanvasHook();
  const onColorChange=(color)=>{
      setColor(color);
      const activeObject = CanvasEditorStore.getActiveObject();
      activeObject.set({
        stroke: color,
        strokeWidth: 3,
        // Set the stroke width as needed
        
      });
      CanvasEditorStore.add(activeObject);
      CanvasEditorStore.renderAll();
  }
return (
  <div>
      <ColorPickerEditor setValue={onColorChange}
       value={color} />
  </div>
)
}


export default BorderColor