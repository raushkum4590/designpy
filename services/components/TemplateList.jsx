import { api } from './../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { useCanvasHook } from '../../hooks';
import React from 'react'
import Image from 'next/image';

function TemplateList() {
     const { CanvasEditorStore } = useCanvasHook(); 
    const templateList = useQuery(api.templates.GetAllTemplates);
    console.log('templateList', templateList);
    const onTemplateSelect = (template) => {
        if(CanvasEditorStore){
            CanvasEditorStore.loadFromJSON(template?.jsonData,()=>{
                CanvasEditorStore?.requestRenderAll();
            })

        }

    };
    
    return (
        <div className='grid grid-cols-2 gap-4'>
            {templateList?.map((template,index)=>(
                <div key={index} >
                    <Image src={template.imagePreview}
                    onClick={()=>onTemplateSelect(template)} alt={template.name} width={500} height={500}
                    className='w-full h-[150px] rounded-lg object-contain bg-gray-300' />
                    <h1>{template.name}</h1>
                </div>
            ))}
            {templateList?.length === 0 && <p>No templates available.</p>}
        </div>
    )
}

export default TemplateList