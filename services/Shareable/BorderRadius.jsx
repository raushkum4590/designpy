import React from 'react'
import { useCanvasHook } from './../../app/(routes)/design/[designId]/page';
import { Slider } from './../../@/components/ui/slider'


function BorderRadius() {
    const { CanvasEditorStore } = useCanvasHook();

    const onRadiusChange = (value) => {
        const activeObject = CanvasEditorStore.getActiveObject();
        activeObject.set({
            rx: value,
            ry: value,
        });
        CanvasEditorStore.add(activeObject);
        CanvasEditorStore.renderAll();

    }
  return (
    <div>
        <h2 className='my-2'>BorderRadius</h2>
        <Slider defaultValue={[33]} max={100} step={1} onValueChange={(v) => onRadiusChange(v[0])} />

    </div>
  )
}

export default BorderRadius