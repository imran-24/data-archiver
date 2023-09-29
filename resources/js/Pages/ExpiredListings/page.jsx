import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CriticalListingsClient from './components/client';

const ExpiredListingsPage = ({rental_infos, divisions, districts, upazilas}) => {
  
  
  const customDivisions = divisions.map(item => ({
    value: item.id.toString(),
    label: item.name,
    title: 'division',
  }))
  const customDistricts = districts.map(item => ({
    value: item.id.toString(),
    division_id: item.division_id.toString(),
    label: item.name,
    title: 'district',
  }))
  const customUpazilas = upazilas.map(item => ({
    value: item.id.toString(),
    district_id: item.district_id.toString(),
    label: item.name,
    title: 'upazila',
  }))

  
  return (
    <AuthenticatedLayout
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title="Dashboard" />
        <div className='flex-col'>
          <div className='flex-1 space-y-4 overflow-y-hidden '>
            <CriticalListingsClient data={rental_infos} divisions={customDivisions} districts={customDistricts} upazilas={customUpazilas}/>
          </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default ExpiredListingsPage