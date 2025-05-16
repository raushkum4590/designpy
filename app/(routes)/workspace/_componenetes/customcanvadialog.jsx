import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./../../../../@/components/ui/dialog"
import { Input } from './../../../../@/components/ui/input'
import { Button } from '../../../../@/components/ui/button'
import { UserDetailContext } from './../../../../context/UserDetailContext'
import { useMutation } from 'convex/react'
import { api } from './../../../../convex/_generated/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


function CustomCanvaDialog({ children }) {
  const[name,setname]=useState()
  const[width,setwidth]=useState()
  const[height,setheight]=useState()
  const{userDetail}=useContext(UserDetailContext)
  const createDesignRecord=useMutation(api.designs.CreateNewDesign)
  const router=useRouter();

  const onCreate=async()=>{
    toast('loading...')
    
    const result =await createDesignRecord({
      name:name,
      width:Number(width),
      height:Number(height),
      uid:userDetail?._id
    });
    console.log(result);
    router.push(`/design/${result}`)

  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Custom Canvas?</DialogTitle>
          <DialogDescription>
            Enter dimensions and a name for your custom canvas.
          </DialogDescription>
        </DialogHeader>
        
        <div className='mt-5'>
          <label>Design Name</label>
          <Input className='mt-1' placeholder='Design Name' onChange={(e)=>setname(e.target.value)}/>
        </div>
        <div className='mt-1 flex gap-4'>
          <div>
            <label>Width</label>
            <Input className='mt-1' placeholder={500} type="number" onChange={(e)=>setwidth(e.target.value)}/>
          </div>
          <div>
            <label>Height</label>
            <Input className='mt-1' placeholder={500} type="number" onChange={(e)=>setheight(e.target.value)}/>
          </div>
          <div className='flex flex-col justify-end mt-6'>
            <Button className='w-full' onClick={onCreate}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomCanvaDialog