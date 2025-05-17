"use client"
import { useParams } from 'next/navigation'
import React, { useState, Suspense } from 'react'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { CanvasProvider } from '../../../../hooks/useCanvasHook';
import dynamic from 'next/dynamic';

// Use dynamic imports to ensure components using client APIs are only loaded on the client side
const DesignHeader = dynamic(() => import('../_componentes/DesignHeader'), { ssr: false });
const CanvasEditor = dynamic(() => import('../_componentes/CanvasEditor'), { ssr: false });
const Sidebar = dynamic(() => import('../_componentes/Sidebar'), { ssr: false });

function DesignEditor(){
    const { designId } = useParams();
    
    // Add error handling and loading state
    try {
        const designData = useQuery(api.designs.GetDesign, { 
            id: designId 
        });

        // Check if we have data before rendering
        if (!designData) {
            return <div className="p-8">Loading design data...</div>;
        }
        
        return (
            <ErrorBoundary fallback={<div>Something went wrong. Please try again.</div>}>
                <CanvasProvider>
                    <div>
                        <DesignHeader designData={designData}/>
                        <div className="flex">
                            <Sidebar />
                            <CanvasEditor designData={designData} />
                        </div>
                    </div>
                </CanvasProvider>
            </ErrorBoundary>
        );
    } catch (error) {
        console.error("Error in DesignEditor:", error);
        return <div className="p-8">Error loading design: {error.message}</div>;
    }
}

// Simple error boundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// Only export the page component
export default DesignEditor;