import Heading from "@/Components/ui/Heading"
import { Button } from "@/Components/ui/button"
import { DataTable } from "@/Components/ui/data-table"
import { Separator } from "@/Components/ui/separator"
import { Plus } from "lucide-react"
import { columns } from "./columns"
import { router } from "@inertiajs/react"


const ListingsClient = ({data}) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading 
        title={`Listings(${data?.length})`}
        subtitle="Manage listings"
        />
        <Button
        onClick={()=> router.visit('/listings/create')}
        >
          <Plus className='h-4 w-4 mr-3' />
          Add New
        </Button>
      </div>
      <Separator /> 
      <div>
        <DataTable searchKey={'office_name'} columns={columns} data={data} />
      </div>
      {/* <Heading 
      title='API'
      subtitle='API calls for Billboards'
      />
      <Separator />
      <ApiList 
      entityName="billboards"
      entityIdName="billboardId"/> */}
    </>
  )
}

export default ListingsClient