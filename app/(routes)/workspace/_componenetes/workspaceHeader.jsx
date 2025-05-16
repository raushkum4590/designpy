import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div className='flex justify-between items-center bg-white px-5 py-3 shadow-md sticky top-0 z-50'>
      <div className='flex items-center space-x-2'>
        <Image src="/logo.svg" alt="Logo" width={120} height={60} className="object-contain" />
        
      </div>
      
      
      
      <div className='flex items-center space-x-4'>
        
        <UserButton />
      </div>
    </div>
  )
}

export default WorkspaceHeader