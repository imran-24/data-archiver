import CellActions from "./cell-actions";

   
  export const columns = [
    {
      accessorKey: "office_name",
      header: "Office name",
    },
    {
      accessorKey: "type_of_rent",
      header: "Rent type",
    },
    {
      accessorKey: "head_office_approval",
      header: "Approval",
      cell:({row})=>(
        <div>
          
          {row.original.head_office_approval ? "Approved" : "Not approved"}
        </div>
      )
    },
    {
      accessorKey: "building_type",
      header: "Building type",
    },
    {
      accessorKey: "starting_date",
      header: "Start date",
      // cell:({row})=>(
      //   <div>
      //     {row.original.value}
      //   </div>
      // )
    },
    {
      accessorKey: "floor_space",
      header: "Floor space",
    },
    {
      accessorKey: "rent_per_sqft",
      header: "Rent/sqft",
    },
    {
      accessorKey: "expiry_date_of_aggrement",
      header: "Expire date",
    },
    // {
    //   accessorKey: "address",
    //   header: "Address",
    // },
    {
      accessorKey: "status",
      header: "Status",
      cell:({row})=>(
        <div>
          {row.original.status ? "Yes" : "No"}
        </div>
      )
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActions row={row.original}/>
    },
    
  ]