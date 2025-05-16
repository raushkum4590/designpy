import React from 'react'
import WorkspaceHeader from './_componenetes/workspaceHeader'
import SideBar from './_componenetes/sidebar'


function Layout({children}) {
  return (
    <div>
        <div>
            <WorkspaceHeader />
            <div className='flex '> 
                {/* Sidebar */}
                <SideBar />
                
            
            {children}
            
            </div>

        </div>
    </div>
  )
}

export default Layout