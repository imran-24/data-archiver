

import { router, usePage } from '@inertiajs/react'
import Heading from './Heading'
import { Button } from './button'


const EmptyState = ({
    title='No exact Matches',
    subtitle='Try changing or removing some of your filters',
    showReset
}) => {

  return (
    <div
    className='
    h-[60vh]
    w-full
    flex 
    flex-col
    items-center
    justify-center
    '
    >
        <Heading
        // center
        title={title}
        subtitle={subtitle}
        />
        <div className='pt-2'>
        {
            showReset && 
            <Button
            variant={"outline"}
            onClick={()=> router.visit('/rental-infos')}
            >Remove all</Button>
        }
        </div>
    </div>
  )
}

export default EmptyState