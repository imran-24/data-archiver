import React from 'react'
import RentalInfoClient from './components/client'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ScrollArea } from '@/Components/ui/scroll-area';

const RentalInfoPage = ({rental_info, divisions, districts, upazilas}) => {
  
  return (

    
    <AuthenticatedLayout
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title="Dashboard" />
        <div className='flex-col'>
          <div className='flex-1 space-y-4 '>
            <RentalInfoClient data={rental_info} divisions={divisions} districts={districts} upazilas={upazilas} />
          </div>
        </div>
    </AuthenticatedLayout>
    
  )
}

export default RentalInfoPage