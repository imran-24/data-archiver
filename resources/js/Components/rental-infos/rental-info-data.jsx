import React from 'react'

import { formatDistanceToNow } from 'date-fns'
import CategoryInput from '../ui/category-input';

const RentalInfoData = ({name, approval, start_date, end_date, floors}) => {
  let floor_list = []
    floor_list = floors.sort((a, b) => {
        const numA = parseInt(a, 10);
        const numB = parseInt(b, 10);

        return numA - numB;
    });

  const remaing = formatDistanceToNow(
    new Date(end_date),
    )

    return (
    <div className=' flex flex-col  space-y-1'>
        <div className='text-xs text-neutral-500 truncate'>
            {name}
        </div>
        <div className='font-extrabold '>
            {approval ? 'Approved' : 'Not Approved'  }
        </div>
        <div className='flex flex-col gap-2 text-xs text-neutral-400'>
            <div>
            Expiration countdown: {remaing}
            </div>
            
        </div>
        <div className='flex items-center flex-wrap gap-1'>
          <div className='text-xs'>Floor Position:</div>
            {floor_list.map(floor => <CategoryInput key={floor} label={floor} />)}
        </div>
    </div>
  )
}

export default RentalInfoData