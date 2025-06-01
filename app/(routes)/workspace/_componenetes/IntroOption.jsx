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
    });    console.log(result);
    router.push(`/design/${result}`)
  }
  return (
    <>
      <div className="w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden shadow-2xl mb-8 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-60 translate-x-60"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-2xl translate-y-40 -translate-x-40"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>          <div className="relative w-full py-6 px-24 flex flex-row items-center justify-between flex-wrap min-h-[350px]">
          <div className="flex-1 min-w-[650px] mr-24 max-w-[850px]"><div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4 shadow-lg">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-sm"></span>
              ✨ New AI Features Available
            </div>            <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
              Create Amazing
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Designs in Minutes
              </span>
            </h1>            <p className="text-base text-white/90 mb-4 leading-relaxed max-w-2xl">
              Professional design tools meet AI-powered creativity. Build stunning graphics, social posts, and presentations with our intuitive drag-and-drop editor.
            </p>
            <div className="flex gap-4 flex-wrap">              <button className="py-3 px-8 bg-white text-indigo-600 font-bold rounded-2xl border-none text-sm cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-gray-50 flex items-center gap-2">
                🚀 Start Creating Now
              </button>
              <button className="py-3 px-8 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/30 text-sm cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-2">
                ✨ Browse Templates
              </button>
            </div>          </div>          
          <div className="flex-1 min-w-[750px] relative max-w-[1000px]">
            {/* Enhanced Editor Interface */}
            <div className="p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-white/20">
              {/* Top toolbar with modern design */}
              <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 p-4 mb-4 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex space-x-3">
                  <div className="w-4 h-4 bg-red-400 rounded-full shadow-sm"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-sm"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full shadow-sm"></div>
                </div>
                <div className="text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm">Designipy Studio</div>
                <div className="flex space-x-3">
                  <div className="w-8 h-5 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"></div>
                  <div className="w-5 h-5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"></div>
                </div>
              </div>
                {/* Canvas area with modern styling */}
              <div className="flex h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white shadow-inner">
                {/* Left sidebar with icons */}
                <div className="w-16 bg-gradient-to-b from-indigo-50 to-purple-50 border-r border-gray-200/50 flex flex-col items-center py-4 space-y-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-sm flex items-center justify-center">
                    <div className="w-4 h-4 border border-white rounded-sm"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer shadow-sm"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer shadow-sm"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer shadow-sm"></div>
                </div>                
                {/* Main canvas with animated elements */}
                <div className="flex-1 bg-gradient-to-br from-white to-gray-50 p-4 relative overflow-hidden">
                  {/* Design elements with animations */}
                  <div className="absolute top-8 left-12 w-32 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-sm font-semibold text-indigo-700 shadow-lg animate-pulse">
                    Text Element
                  </div>
                  <div className="absolute bottom-6 right-14 w-20 h-20 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 shadow-xl animate-bounce" style={{animationDuration: '3s'}}></div>
                  <div className="absolute top-16 right-28 w-28 h-12 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl shadow-lg transform rotate-3"></div>
                  <div className="absolute bottom-14 left-16 w-14 h-14 bg-gradient-to-br from-green-200 to-teal-200 rounded-2xl rotate-12 shadow-lg"></div>
                  
                  {/* Additional floating elements */}
                  <div className="absolute top-4 right-8 w-6 h-6 bg-red-200 rounded-full opacity-70"></div>
                  <div className="absolute bottom-20 left-8 w-8 h-8 bg-blue-200 rounded-lg opacity-60 rotate-45"></div>
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                  </div>
                </div>
                
                {/* Right panel with enhanced design */}
                <div className="w-20 bg-gradient-to-b from-gray-50 to-gray-100 border-l border-gray-200/50 flex flex-col items-center py-4 space-y-4">
                  <div className="w-12 h-5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
                  <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-2xl shadow-sm flex items-center justify-center">
                    <div className="w-5 h-5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg"></div>
                  </div>
                  <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"></div>
                </div>
              </div>
            </div>            
            {/* Floating design elements with improved styling */}
            <div className="p-4 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl absolute top-10 -left-8 z-5 rotate-[-8deg] border border-white/50">
              <div className="w-[100px] h-[100px] bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 rounded-2xl flex items-center justify-center shadow-inner">
                <div className="w-12 h-12 border-3 border-white rounded-xl shadow-sm bg-white/50"></div>
              </div>
            </div>
            
            <div className="p-4 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl absolute bottom-8 right-4 z-5 rotate-[12deg] border border-white/50">
              <div className="w-[120px] h-[70px] bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200 rounded-2xl flex items-center justify-center shadow-inner">
                <div className="text-sm font-bold text-teal-700 tracking-wide">ELEMENTS</div>
              </div>
            </div>
            
            {/* Additional floating element */}
            <div className="p-3 bg-gradient-to-r from-pink-200 to-rose-200 rounded-2xl shadow-xl absolute top-1/2 -right-6 z-5 rotate-[18deg]">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-pink-500 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
          <div className="w-full bg-black/20 backdrop-blur-sm py-2">
          <div className="max-w-full mx-auto px-20 flex justify-center text-white text-sm">            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              🎨 Join over 2M+ creators designing beautiful graphics every day!
            </p>
          </div>
        </div>
      </div>      {/* Canvas Selection Section - Modern Grid Layout */}
      <div className="mb-8 px-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Choose Your Canvas</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Select the perfect size for your project and start creating amazing designs</p>
        </div>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6 max-w-full mx-auto'>
          {canvasSizeOtptions.map((option, index) => (            <div 
              key={index} 
              className='group flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1'
              onClick={() => onCanvasOptionSelect(option)}
            >
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <Image 
                  src={option.icon} 
                  alt={option.name} 
                  width={32} 
                  height={32} 
                  className='transition-transform duration-300 group-hover:scale-110'
                />
              </div>
              <h3 className='text-sm font-bold text-gray-800 text-center group-hover:text-indigo-600 transition-colors duration-300 mb-1'>
                {option.name}
              </h3>
              <p className='text-xs text-gray-500 text-center font-medium'>
                {option.width} × {option.height}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </>
  )
}

export default IntroOption