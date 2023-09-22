import React from 'react'

import { Link } from '@inertiajs/react'
import { Button } from '../ui/button'
const RentalInfoFooter = ({space, price, rental_info}) => {
  return (
    <div className='mt-auto flex flex-col sm:flex-row gap-2 pt-2 sm:pt-0 justify-between'>
        <div className='flex flex-col justify-center gap-1'>
            <div className='text-[12px] text-neutral-500 '>
              Floor space:  {space} sqfts
            </div>
            <div className='text-[12px] text-neutral-500 '>
              Price:  {price}/sqft
            </div>
        </div>

        <Link className=''  href={ route('rental-infos.show', rental_info)}  >
          <Button variant={'outline'} className='w-[120px]'>Detail view</Button>  
        </Link> 
    </div>
  )
}

export default RentalInfoFooter