"use client"
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import CustomCanvaDialog from './customcanvadialog';
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { UserDetailContext } from '../../../../context/UserDetailContext';



function RecentDesign() {
    const [designList,setDesignList] = useState([]);
    const{userDetail}=useContext(UserDetailContext);
    const convex=useConvex();
    useEffect(()=>{
      if (userDetail && userDetail._id) {
        GetRecentDesigns();
      }
    },[userDetail])
    
    const GetRecentDesigns=async()=>{
      try {
        const result=await convex.query(api.designs.GetUserDesigns,{
          uid:userDetail._id,
        });
        console.log('recent designs',result);
        setDesignList(result || []);
      } catch (error) {
        console.error("Error fetching designs:", error);
        setDesignList([]);
      }
    }
  return (
    <div className='mt-7 rounded-lg '>
        <h2 className='font-bold text-3xl text-gray-800 mb-6'>Recent Designs</h2>
        {designList?.length == 0 ?
        <div className='flex flex-col items-center justify-center py-8 px-3 rounded-lg border border-dashed border-gray-200 my-3'>
            <Image 
                src={'/ho.jpeg'} 
                alt='empty designs' 
                width={80} 
                height={80} 
                className='mb-2  rounded-2xl'
            />
            <h2 className='text-center text-base font-medium text-gray-600 mb-1'>You don't have any designs created yet</h2>
            <p className='text-center text-sm text-gray-500 mb-4 max-w-md'>Create your first design to get started with your creative journey</p>
            <CustomCanvaDialog>
            <Button className="flex items-center gap-1 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 transition-colors">
                <PlusCircle size={16} />
                <span>Create New Design</span>
            </Button>
            </CustomCanvaDialog>
        </div>:
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {designList.map((design,index)=>(
                <div key={index} className='flex flex-col items-center justify-center border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer'>
                    <Image 
                        src={design.imagePreview} 
                        alt={design.name} 
                        width={500} 
                        height={500} 
                        className='w-full h-[150px] rounded-lg object-cover mb-2' 
                    />
                    <h1 className='text-center text-lg font-semibold'>{design.name}</h1>
                </div>
            ))}
        </div>}
    </div>
  )
}

export default RecentDesign