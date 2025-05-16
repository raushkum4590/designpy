"use client"

// Proper imports for Next.js with fabric.js
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

function CanvasEditor({ designData }) {
  const canvasRef = useRef();
  const [canvas, setCanvas] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  
  // Load fabric.js dynamically on client side
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      import('fabric').then((fabricModule) => {
        window.fabric = fabricModule;
        setFabricLoaded(true);
      }).catch(err => {
        console.error("Failed to load fabric.js:", err);
        setError("Failed to load fabric.js library");
      });
    }
  }, []);
  
  useEffect(() => {
    // Only proceed if fabric is loaded and we have design data
    if (!fabricLoaded || !designData) {
      return;
    }
    
    // The rest of your canvas initialization logic
    // ...using window.fabric instead of fabric directly
    
  }, [fabricLoaded, designData]);
  
  // Rest of component...
}

export default CanvasEditor;