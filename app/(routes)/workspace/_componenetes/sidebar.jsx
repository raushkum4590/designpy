"use client"
import React from 'react'
import Workspace, { canvasSizeOtptions } from './../../../../services/option'
import { CirclePlus } from 'lucide-react'
import { usePathname } from 'next/navigation'

function SideBar() {

  const path = usePathname();
  console.log(path)
  
  // Determine if we're on the home page or another path
  const isHomePage = path === '/workspace' || path === '/workspace/home';
  
  return (
    <div className='h-screen shadow-sm bg-blue-50 p-2'>
      <div className='p-2 flex flex-col items-center justify-center hover:cursor-pointer mb-7 hover:bg-blue-200 rounded-xl'>
        <div className='bg-blue-600 text-white rounded-full p-1 mb-1'>
          <CirclePlus className='h-6 w-6' />
        </div>
        <h2 className='text-sm'>Create</h2>
      </div>
      {Workspace.map((item, index) => (
        <div key={index} className={`flex items-center p-2 flex-col mb-4 hover:bg-blue-200 rounded-xl cursor-pointer
          ${(item.path === path || (item.name.toLowerCase() === 'home' && isHomePage)) ? 'bg-blue-200' : ''}`}>
          <item.icon className={`text-sm group-hover:text-blue-800 
            ${(item.path === path || (item.name.toLowerCase() === 'home' && isHomePage)) ? 'bg-blue-200' : ''}`} />
          <span>{item.name}</span>
        </div>
      ))}
      
    </div>
    
  )
}

export default SideBar