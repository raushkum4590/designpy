import React from 'react'

function SidebarSetting({selectedOption}) {
  return (
   <div className='w-[280px] p-5 h-screen border-r'>
       <h2 className='font-bold'>{selectedOption?.name}</h2>
       <div className='mt-7'>
       {selectedOption?.component} {/* Changed Component to component */}
       </div>
   </div>
  )
}
export default SidebarSetting