import { Canvas } from "fabric";
import { useContext, useEffect, useRef, useState } from "react";
import { useCanvasHook } from '../../../../hooks/useCanvasHook';
import TopNavBar from "./../../../../services/components/TopNavBar";

function CanvasEditor({designData}) {
    const canvasRef = useRef();
    const [canvas, setCanvas] = useState(null);
    const {CanvasEditorStore, setCanvasEditorStore} = useCanvasHook();
    
    useEffect(() => {
        console.log(designData); // Logging the design data
        
        if(canvasRef.current && designData) {
            const initCanvas = new Canvas(canvasRef.current, {
                backgroundColor: 'white',
                width: designData?.width/1.2,
                height: designData?.height/1.2,
                preserveObjectStacking: true,
            });
            if(designData?.jsonTemplate){
                initCanvas.loadFromJSON(designData?.jsonTemplate,()=>{
                    initCanvas?.requestRenderAll();
                })
            }
            //set High Resolution
           
            initCanvas.renderAll();
            setCanvas(initCanvas);
            setCanvasEditorStore(initCanvas);
            return ()=>{
                initCanvas.dispose();
            }
        }
    }, [designData]);
     useEffect(()=>{
        const handleKeyDown=(event)=>{
            if( event?.key == 'Backspace'){
              
                if(CanvasEditorStore){
                    const activeObject = CanvasEditorStore.getActiveObject();
                    if(activeObject){
                        CanvasEditorStore.remove(activeObject);
                        CanvasEditorStore.renderAll();
                    }
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }

     },[CanvasEditorStore])

    return (
        <div className="bg-gray-200 w-full h-screen overflow-hidden">
            <TopNavBar/>
        
            <div className='flex mt-12 items-center justify-center'>
                <canvas id='canvas' ref={canvasRef}/>
            </div>
        </div>
    );
}

export default CanvasEditor;