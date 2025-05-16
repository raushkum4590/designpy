import React, { useState } from 'react'
import { AITransformationSettings } from '../option'
import Image from 'next/image'
import CustomImageUpload from './../Shareable/CustomImageUpload'

function AiTransformSetting() {
  const [selectedAi, setSelectedAi] = useState(null);
  
  const handleSelectAi = (option) => {
    setSelectedAi(option);
    console.log("Selected AI:", option.name); // Debug log to verify selection
  };
  
  return (
    <div>
      <CustomImageUpload selectedAi={selectedAi} /> 
        <div className='mt-4 grid grid-cols-2 gap-3'>
            {AITransformationSettings.map((option, index) => (
                <div 
                    key={index} 
                    onClick={() => handleSelectAi(option)}
                    className={`cursor-pointer transition-all duration-200 ${selectedAi === option ? 'ring-2 ring-blue-500 scale-105' : ''}`}
                >
                    <Image src={option.image} alt={option.name}
                    width={500}
                    height={500} className='w-full h-[70px] object-cover rounded-xl' />
                    <h2 className='text-center text-sm font-semibold'>{option.name}</h2>
                    {selectedAi === option && (
                        <div className='flex justify-center mt-1'>
                            <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}

export default AiTransformSetting