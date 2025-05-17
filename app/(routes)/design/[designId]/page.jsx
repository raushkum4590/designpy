"use client"
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { CanvasProvider, useCanvasHook } from '../../../../hooks';
import DesignHeader from '../_componentes/DesignHeader';
import CanvasEditor from '../_componentes/CanvasEditor';
import Sidebar from '../_componentes/Sidebar';

// Re-export the hook for backward compatibility
export { useCanvasHook };

function DesignEditor(){
    const { designId } = useParams();
    
    const designData = useQuery(api.designs.GetDesign, { 
        id: designId 
    });
    
    return (
        <CanvasProvider>
            <div>
                <DesignHeader designData={designData}/>
                <div className="flex">
                    <Sidebar />
                    <CanvasEditor designData={designData} />
                </div>
            </div>
        </CanvasProvider>
    )
}

export default DesignEditor