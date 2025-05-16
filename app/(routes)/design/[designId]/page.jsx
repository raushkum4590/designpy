'use client'
import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import DesignHeader from './../../design/_componentes/DesignHeader'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import SideBar from '../../design/_componentes/Sidebar';
import CanvasEditorComponent from '../../design/_componentes/CanvasEditor';
import { CanvasContext } from '../../../../context/CanvasContext';


function DesignEditor(){
    const { designId } = useParams();
    const [CanvasEditorStore, setCanvasEditorStore] = useState(); // Match the naming in CanvasEditor.jsx
    
    const designData = useQuery(api.designs.GetDesign, { 
        id: designId 
    });
    
    return (
        <div>
            <CanvasContext.Provider value={{CanvasEditorStore, setCanvasEditorStore}}>
                <DesignHeader designData={designData}/>
                <div className='flex'>
                    <SideBar/>
                    <CanvasEditorComponent designData={designData}/>
                </div>
            </CanvasContext.Provider>
        </div>
    )
}

export default DesignEditor

export const useCanvasHook = () => {
    const context = useContext(CanvasContext);
    if(!context){
        throw new Error('useCanvasHook must be used within a CanvasProvider')
    }
    return context;
}