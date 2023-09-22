'use client'

import AlertModal from "@/Components/modals/alert-modal"
import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { router } from "@inertiajs/react"
import axios from "axios"

import { Copy, Edit, Link, MoreHorizontal, Trash } from 'lucide-react'
import {useState} from 'react'
import toast from 'react-hot-toast'


const CellActions = ({row: listing}) => {
 
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onCopy = (id)=>{
    navigator.clipboard.writeText(id);
    toast.success("Listing Id copied to the clipboard")
  }

  const onDelete = async()=>{
    try{
      setLoading(true)
      const response = await axios.delete(`/listings/${listing.id}`)
      toast.success("Listings deleted")
      window.location.assign('/listings')
      
    }catch(error){
      setOpen(false)
      toast.error("Something went wrong")
    }finally{
      setOpen(false)
    }
  }
  
  return (
    <>
      <AlertModal
      isOpen={open}
      disabled={loading}
      onCancel={()=> setOpen(false)}
      onConfirm={onDelete}
      />
      <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button  
          variant={'ghost'}>
            <MoreHorizontal className='h-4 w-4 p-0'  />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
          onClick={()=> onCopy(listing.id)}>
            <Copy className='h-4 w-4 mr-2' />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={()=> router.visit(`/listings/${listing.id}/edit`)}
          >
            {/* <Link href={''}> */}
            <Edit className='h-4 w-4 mr-2' />
            Update
            {/* </Link> */}
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={()=> setOpen(true)}>
            <Trash className='h-4 w-4 mr-2' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

    </>
  )
}

export default CellActions