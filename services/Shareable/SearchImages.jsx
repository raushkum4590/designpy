import axios from 'axios'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Input } from '../../@/components/ui/input';
import { Button } from '../../@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
import { FabricImage } from 'fabric';

function SearchImages() {
    const [imageList, setImageList] = useState([]);
    const [searchInput, setSearchInput] = useState();
      const { CanvasEditorStore } = useCanvasHook();
    

    useEffect(() => {
        GetImageList('Gradient');
    }, []);

    const GetImageList = async (searchInput) => {
        try {
            const result = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: searchInput,
                    client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
                    page: 1,
                    per_page: 10,
                },
                headers: {
                    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
                },
            });
            setImageList(result.data.results); // use .results for actual images
            console.log(result.data.results);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };
    
    const addImageToCanvas = async(imageUrl) => {
        if (!CanvasEditorStore) {
            console.error("Canvas editor is not available");
            return;
        }
        try {
            const canvasImageRef = await FabricImage.fromURL(
                imageUrl,
                {
                    crossOrigin: 'anonymous',
                }
            );
            CanvasEditorStore.add(canvasImageRef);
            CanvasEditorStore.renderAll();
        } catch (error) {
            console.error("Error adding image to canvas:", error);
        }
    }

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-sm'>Search Images</h2>
            <div className=' mt-3 flex gap-2 items-center my-2'>
            <Input placeholder={'nature'} onChange={(e)=>setSearchInput(e.target.value)}/>
            <Button onClick={() => GetImageList(searchInput)}><SearchIcon/></Button>
            </div>
        <div className='grid grid-cols-2 gap-2 overflow-auto h-[70vh]'>
            {imageList.map((image, index) => (
                <div key={index} onClick={()=>addImageToCanvas(image?.urls?.small)} className='cursor-pointer'>
                    <Image 
                        src={image?.urls?.thumb} 
                        alt={image?.alt_description || image?.slug || 'Unsplash image'} 
                        width={300}
                        height={300}
                        className='w-full h-[80px] rounded-sm'
                    />
                </div>
            ))}
            </div>
        </div>
    );
}

export default SearchImages;
