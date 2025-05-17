"use client"
import React from 'react'
import { StackProvider } from '@stackframe/stack';
import WorkspaceHeader from './_componenetes/workspaceHeader'
import SideBar from './_componenetes/sidebar'


export default function Layout({ children }) {
  return (
    <div>
      <WorkspaceHeader />
      <div className='flex '> 
                {/* Sidebar */}
                <SideBar />
                
            
            {children}
            
            </div>
    </div>
  );
}