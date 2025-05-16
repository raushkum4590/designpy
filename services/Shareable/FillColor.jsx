import React, { useState } from 'react'
import ColorPickerEditor from './../Shareable/ColorPickerEditor'
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';

function FillColor() {
    const [color, setColor] = useState();
      const { CanvasEditorStore } = useCanvasHook();
    const onColorChange=(color)=>{
        setColor(color);
        const activeObject = CanvasEditorStore.getActiveObject();
        activeObject.set({
            fill: color,
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

export default FillColor