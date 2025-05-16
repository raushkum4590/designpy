import React from 'react'
import { ShapeList } from '../option'
import Image from 'next/image'
import { Circle, Line, Rect, Triangle } from 'fabric'
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page'

function Shapes() {
const { CanvasEditorStore } = useCanvasHook();

  const Properties={
    left:100,
    top:100,
    radius:50,
    fill:'black',
    stroke:'black',
    height:100,
    width:100,
    strokeWidth:0,
    rx:0,
    ry:0,
    
    
  }
  const onShapeSelect=(shape)=>{
    if(shape.name=='Circle'){
      const circleRef=new Circle({
        ...Properties,

      })
      CanvasEditorStore.add(circleRef)
    }else if(shape.name=='Square'){
      const squareRef=new Rect({
        ...Properties,
        radius:0,
      })
      CanvasEditorStore.add(squareRef)
   
    }else if(shape.name=='Line'){
      const lineRef=new Line([50,50,200,200],{
        stroke:'black',
       strokeWidth:5
      })
      CanvasEditorStore.add(lineRef)
    }
    CanvasEditorStore.renderAll()
  }

  return (
    <div>
        <div>
          <div className='grid grid-cols-2 gap-3'>
            {ShapeList.map((shape,index)=>(
              <div key={index} className='p-2 border rounded-xl'
                onClick={() => onShapeSelect(shape)}>
                <Image src={shape.icon} alt={shape.name}
                 width={100} height={100} />
                </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Shapes