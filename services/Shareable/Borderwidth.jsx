import { useCanvasHook } from '../../hooks';
import { Slider } from './../../@/components/ui/slider'
import React from 'react'

function Borderwidth() {
      const { CanvasEditorStore } = useCanvasHook();

    const onWidthChange = (value) => {
        const activeObject = CanvasEditorStore.getActiveObject();
        activeObject.set({
            strokeWidth: value,
        });
        CanvasEditorStore.add(activeObject);
        CanvasEditorStore.renderAll();

    }
  return (
    <div>
        <h2 className='my-2'>BorderWidth</h2>
        <Slider defaultValue={[33]} max={100} step={1} onValueChange={(v) => onWidthChange(v[0])} />

    </div>
  )
}

export default Borderwidth