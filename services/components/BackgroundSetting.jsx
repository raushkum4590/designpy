import React, { useState } from 'react' 
import ColorPickerEditor from '../Shareable/ColorPickerEditor' 
import { useCanvasHook } from '../../hooks';  

function BackgroundSetting() {     
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const { CanvasEditorStore } = useCanvasHook();  // Changed from canvasEditor to match context
    
    const setValue = (color) => {
        setBackgroundColor(color);
        CanvasEditorStore?.set({
            backgroundColor: color,
            backgroundImage: null,
        })
        CanvasEditorStore.renderAll();
    }
    
    return (
        <div>
            <ColorPickerEditor
                value={backgroundColor}
                setValue={(v) => setValue(v)}
            />
        </div>
    ) 
}  

export default BackgroundSetting;