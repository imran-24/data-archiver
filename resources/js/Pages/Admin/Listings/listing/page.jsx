
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import ListingForm from './components/listing-form';
import { useMemo } from 'react';


const ListingPage = ({
  listing,
  divisions,
  districts,
  upazilas
}) => {

  
  const customDivisions = divisions.map(items => ({
    value: items.id.toString(),
    label: items.name
  }))
  const customDistricts = districts.map(item => ({
    value: item.id.toString(),
    division_id: item.division_id.toString(),
    label: item.name
  }))
  const customUpazilas = upazilas.map(item => ({
    value: item.id.toString(),
    district_id: item.district_id.toString(),
    label: item.name
  }))

  const formatedListing = listing && {
    ...listing,
    'starting_date': new Date(listing.starting_date),
    'year_of_construction': new Date(listing.year_of_construction),
    'head_office_approval': listing.head_office_approval ? true : false,
    'location':
      {
        lng: listing.longitude, // Realistic range for longitude
        lat: listing.latitude,   // Realistic range for latitude
      }
    
  }

  return (
    <AuthenticatedLayout
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title="Dashboard" />
        <div className='flex-col'>
          <div className='flex-1 space-y-4 px-8'>
            <ListingForm 
            initialData={formatedListing} 
            divisions={customDivisions}
            districts={customDistricts} 
            upazilas={customUpazilas} />
          </div>
        </div>
    </AuthenticatedLayout>
)
}

export default ListingPage