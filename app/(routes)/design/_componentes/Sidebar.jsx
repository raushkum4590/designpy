import { sideBarMenu } from './../../../../services/option'
import React, { useState } from 'react'
import SidebarSetting from './../../../../app/(routes)/design/_componentes/SidebarSetting'

function SideBar() {
    const [selectedOption, setSelectedOption] = useState(sideBarMenu[0]);
  return (
    <div className='flex'>
    <div className='p-2 w-[120px] h-screen border-r pt-2'>
        {sideBarMenu.map((item, index) => (
            <div key={index} className={`flex flex-col items-center mb-3 p-2 hover:bg-gray-200 cursor-pointer
                ${selectedOption?.name === item.name ? 'bg-gray-300' : ''}`}
                onClick={() => setSelectedOption(item)}>
                <item.icon className='w-5 h-5 mr-2' />
                <span className='text-sm mt-1'>{item.name}</span>
                </div>
))}


    </div>
    
    <SidebarSetting selectedOption={selectedOption}/>
    </div>
  )
}

export default SideBar