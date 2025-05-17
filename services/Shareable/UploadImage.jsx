import { Button } from './../../@/components/ui/button';
import ImageKit from 'imagekit';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { FabricImage } from 'fabric';
import { useCanvasHook } from '../../hooks/useCanvasHook';

function UploadImage() { 
  const { designId } = useParams();
  const [loading, setLoading] = useState(false);
  // Use your custom hook to get the actual canvas instance
  const { CanvasEditorStore } = useCanvasHook();
  
  // Initialize ImageKit (note: storing private key in frontend is not secure)
  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  });
  
  const onFileUpload = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      
      if (!file) {
        console.error("No file selected");
        setLoading(false);
        return;
      }
      
      // Upload image to ImageKit
      const imageRef = await imagekit.upload({
        file: file,
        fileName: designId + ".png",
        isPublished: true,
      });
      console.log("Image uploaded successfully:", imageRef);
      console.log("Image URL:", imageRef.url);
      
      // Use the URL from the uploaded image to create a Fabric image instance
      const canvasImageRef = await FabricImage.fromURL(imageRef.url);
      
      // Use the actual canvas instance from the hook
      if (CanvasEditorStore && typeof CanvasEditorStore.add === 'function') {
          CanvasEditorStore.add(canvasImageRef);
          CanvasEditorStore.renderAll();
      } else {
          console.error("Canvas editor instance is not ready or does not have an add method.");
      }
  
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor='uploadImage'>
        <h2 className='p-2 bg-purple-500 text-white text-center text-sm rounded-md cursor-pointer'>
          {loading ? <Loader2 className='animate-spin mx-auto'/> : 'Upload Image'}
        </h2>
      </label>
      <div>
        <input 
          type='file' 
          id='uploadImage' 
          className='hidden'
          multiple={false}
          accept="image/*"
          onChange={onFileUpload} 
        />
      </div>
    </div>
  );
}

export default UploadImage;
