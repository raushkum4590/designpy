import React from 'react'
import { ChromePicker, CirclePicker } from 'react-color'

function ColorPickerEditor({value, setValue}) {
  return (
    <div className='space-y-4'>
        <ChromePicker
        color={value}
        onChange={(color) => setValue(color.hex)}
        className='border-r rounded-2xl mb-5'/>
        <CirclePicker
        color={value}
        onChange={(color) => setValue(color.hex)}
        />
    </div>
  )
}

export default ColorPickerEditor