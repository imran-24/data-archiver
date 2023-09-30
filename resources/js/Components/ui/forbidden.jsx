

import { router, usePage } from '@inertiajs/react'
import Heading from './Heading'
import { Button } from './button'
import { useSearchParams } from 'react-router-dom';


const Forbidden = ({
    title='403',
    subtitle='FORBIDDEN',
    showReset
}) => {
  
  return (
    <div
    className='
    h-[100vh]
    w-full
    flex 
    flex-col
    items-center
    justify-center
    '
    >
        <div className='flex items-center justify-center gap-3'>
            <div>{title}</div>
            <div>{subtitle}</div>
        </div>
    </div>
  )
}

export default Forbidden