
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ListingsClient from './components/client'
import { Head } from '@inertiajs/react';

const ListingsPage = ({listings}) => {
  
  return (
    <AuthenticatedLayout
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title="Dashboard" />
        <div className='flex-col'>
          <div className='flex-1 space-y-4 px-8'>
            <ListingsClient data={listings}/>
          </div>
        </div>
    </AuthenticatedLayout>
)
}

export default ListingsPage