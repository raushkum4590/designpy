"use client"
import React, { useContext } from 'react'
import { canvasSizeOtptions } from '../../../../services/option'
import Image from 'next/image'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { UserDetailContext } from '../../../../context/UserDetailContext'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function IntroOption() {

  const createDesignRecord=useMutation(api.designs.CreateNewDesign);
  const {userDetail}=useContext(UserDetailContext);
   const router=useRouter();
  const onCanvasOptionSelect=async(option)=>{
    toast('loading...')

    const result =await createDesignRecord({
      name:option.name,
      width:option.width,
      height:option.height,
      uid:userDetail?._id
    });
    console.log(result);
    router.push(`/design/${result}`)



  }
  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl overflow-hidden shadow-2xl mb-6">
        <div className="max-w-7xl mx-auto py-4 px-8 flex flex-row items-center justify-between flex-wrap">
          <div className="flex-1 min-w-[200px] mr-5">
            <h1 className="text-2xl font-bold text-white mb-1 leading-tight">
              Design Like a Pro
            </h1>
            <p className="text-sm text-white mb-3">
              Create stunning graphics, social media posts, presentations, and more with our easy-to-use drag-and-drop editor.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="py-1.5 px-6 bg-white text-blue-600 font-bold rounded-lg border-none text-sm cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg">
                Start Designing
              </button>
              <button className="py-1.5 px-6 bg-transparent text-white font-bold rounded-lg border-2 border-white text-sm cursor-pointer transition-all duration-200 hover:bg-white/10">
                Explore Templates
              </button>
            </div>
          </div>
          
          <div className="flex-1 min-w-[350px] relative">
            {/* Editor Interface - More Canva-like */}
            <div className="p-2 bg-white rounded-xl shadow-xl relative z-10 overflow-hidden">
              {/* Top toolbar */}
              <div className="w-full bg-gray-100 p-1 mb-1 rounded-t-lg flex items-center justify-between">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-16 h-4 bg-gray-200 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                </div>
              </div>
              
              {/* Canvas area */}
              <div className="flex h-28">
                {/* Left sidebar */}
                <div className="w-8 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-2 space-y-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-md"></div>
                  <div className="w-5 h-5 bg-gray-300 rounded-md"></div>
                  <div className="w-5 h-5 bg-gray-300 rounded-md"></div>
                  <div className="w-5 h-5 bg-gray-300 rounded-md"></div>
                </div>
                
                {/* Main canvas */}
                <div className="flex-1 bg-gray-50 p-2 relative">
                  {/* Design elements */}
                  <div className="absolute top-5 left-8 w-24 h-12 bg-blue-100 rounded-md flex items-center justify-center text-xs font-medium text-blue-600">Text Block</div>
                  <div className="absolute bottom-4 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-red-300"></div>
                  <div className="absolute top-12 right-20 w-20 h-8 bg-yellow-100 rounded-sm"></div>
                  <div className="absolute bottom-10 left-12 w-10 h-10 bg-green-200 rounded-md rotate-12"></div>
                </div>
                
                {/* Right panel */}
                <div className="w-12 bg-gray-50 border-l border-gray-200 flex flex-col items-center py-2 space-y-3">
                  <div className="w-8 h-3 bg-gray-300 rounded-sm"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
            
            {/* Design elements floating around */}
            <div className="p-2 bg-white rounded-xl shadow-lg absolute top-6 -left-5 z-5 rotate-[-5deg]">
              <div className="w-[70px] h-[70px] bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-md"></div>
              </div>
            </div>
            
            <div className="p-2 bg-white rounded-xl shadow-lg absolute bottom-5 right-2 z-5 rotate-[8deg]">
              <div className="w-[90px] h-[50px] bg-gradient-to-r from-teal-200 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-[10px] font-bold text-white">ELEMENTS</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-blue-800/20 py-0.5">
          <div className="max-w-7xl mx-auto px-8 flex justify-center text-white text-xs">
            <p>Join millions of creators and design beautiful graphics today!</p>
          </div>
        </div>
      </div>
      
      {/* Canvas Selection Section - Horizontal Canva-like Layout */}
      <div className='flex gap-6 items-center'>
        {canvasSizeOtptions.map((option, index) => (
          <div key={index} className='flex flex-col items-center  cursor-pointer'
          onClick={()=>onCanvasOptionSelect(option)}>
            <Image src={option.icon} alt={option.name} width={50} height={50} 
            className='hover:scale-105 transition-all'/>
            <h2 className='text-sm mt-2 font-medium'>{option.name}</h2>
            </div>

        ))}
      </div>
      
    </>
  )
}

export default IntroOption