import React from 'react'
import UploadImage from '../Shareable/UploadImage'
import SearchImages from '../Shareable/SearchImages'
import { useCanvasHook } from '../../hooks';

function ImageUploadSetting() {
  return (
    <div>
        <UploadImage />
        <SearchImages />
    </div>
  )
}

export default ImageUploadSetting