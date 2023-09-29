

import { router, usePage } from '@inertiajs/react'
import Heading from './Heading'
import { Button } from './button'
import { useSearchParams } from 'react-router-dom';


const EmptyState = ({
    title='No exact Matches',
    subtitle='Try changing or removing some of your filters',
    showReset
}) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const removeFilter = () => {
    const params = {}
    setSearchParams(params)
    router.visit('/rental-infos')
  }
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
            onClick={removeFilter}
            >Remove all</Button>
        }
        </div>
    </div>
  )
}

export default EmptyState