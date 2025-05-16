import { UserButton } from '@stackframe/stack'
import React, { useState, useEffect } from 'react'
import { Input } from '../../../../@/components/ui/input'
import { Button } from '../../../../@/components/ui/button';
import { Download, Save } from 'lucide-react';
import { useCanvasHook } from '../[designId]/page';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import ImageKit from 'imagekit';


function DesignHeader({designData}) {
  const [searchValue, setSearchValue] = useState(designData?.name || '');
    const { CanvasEditorStore } = useCanvasHook(); 
    const {designId}=useParams();
    const SaveDesign=useMutation(api.designs.SaveDesign);
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });
  const onSave =async () => {
    try {
      if(CanvasEditorStore){
        
        const base64Image = CanvasEditorStore.toDataURL({
          format: 'png',
          quality: 1,
        });
         // Upload image to ImageKit
      const imageRef = await imagekit.upload({
        file: base64Image,
        fileName: designId + ".png",
        isPublished: true,
        useUniqueFileName:false

      });
      console.log("Image uploaded successfully:", imageRef.url);
      const JsonDesign=CanvasEditorStore.toJSON();
        
      const result=await SaveDesign({
        id: designId,
        jsonDesign: JsonDesign,
        imagePreview: imageRef.url
      });
      console.log('Save result', result);
      toast('saved!');
      }
    } catch (error) {
      console.error('Failed to save design:', error);
      toast.error('Failed to save design');
    }
  }
  
  const onExport = async () => {
    try {
      if (!CanvasEditorStore) {
        toast.error('Canvas editor not available');
        return;
      }
      
      // Set crossOrigin property to allow exporting canvas with external images
      CanvasEditorStore.getObjects().forEach(obj => {
        if (obj.type === 'image' && obj._element) {
          obj._element.crossOrigin = 'anonymous';
        }
      });
      
      // Use fabric's built-in export function
      CanvasEditorStore.discardActiveObject();
      CanvasEditorStore.renderAll();
      
      try {
        // Try using toDataURL directly
        const dataUrl = CanvasEditorStore.toDataURL({
          format: 'png',
          quality: 1,
        });
        downloadImage(dataUrl);
      } catch (exportError) {
        console.error('Direct export failed, trying alternative method:', exportError);
        
        // Alternative: Use cloneWithoutImage to create a clean version for export
        const json = CanvasEditorStore.toJSON();
        const canvas = document.createElement('canvas');
        canvas.width = CanvasEditorStore.width;
        canvas.height = CanvasEditorStore.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Render visible elements to the new canvas context
        CanvasEditorStore.renderAll();
        ctx.drawImage(CanvasEditorStore.getElement(), 0, 0);
        
        const cleanDataUrl = canvas.toDataURL('image/png');
        downloadImage(cleanDataUrl);
      }
    } catch (error) {
      console.error('Failed to export design:', error);
      toast.error('Failed to export design: ' + error.message);
    }
  };
  
  const downloadImage = (dataUrl) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = searchValue ? `${searchValue}.png` : 'design.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Design exported successfully');
  };
  
  // Update the state if designData changes
  useEffect(() => {
    if(designData?.name) {
      setSearchValue(designData.name);
    }
  }, [designData?.name]);

  return (
    <div className='flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 shadow-md'>
        <h1>Designpy</h1>
        <Input  
          placeholder='Search' 
          className='border border-gray-300 rounded-md px-4 py-2 w-1/3'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className='flex  gap-5'>
        <Button onClick={onSave}><Save/>save</Button>
        <Button onClick={onExport}><Download/>Export</Button>
        </div>

        <UserButton/>
    </div>
  )
}

export default DesignHeader