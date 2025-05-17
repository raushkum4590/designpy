import { Slider } from './../../@/components/ui/slider';
import { useCanvasHook } from '../../hooks';
import React from 'react'

function Opacity() {
    const { CanvasEditorStore } = useCanvasHook();

    const onOpacityChange = (value) => {
        const activeObject = CanvasEditorStore.getActiveObject();
        activeObject.set({
            opacity: value,
        });
        CanvasEditorStore.add(activeObject);
        CanvasEditorStore.renderAll();

    }
  return (
    <div>
        <h2 className='my-2'>Opacity</h2>
        <Slider defaultValue={[1]} max={1} step={0.1} onValueChange={(v) => onOpacityChange(v[0])} />

    </div>
  )
}


export default Opacity