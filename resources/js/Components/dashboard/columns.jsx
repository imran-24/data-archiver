// import CellActions from "./cell-actions";

   
  export const columns = [
    {
      accessorKey: "year",
      header: "Expired within ",
      cell:({row})=>(
        <div className="">
          {row.original.year} year
        </div>
      )
    },
    {
      accessorKey: "total",
      header: "Total listings",
      cell:({row})=>(
        <div className="">
          {row.original.total} 
        </div>
      )
    },
    // {
    //   id: "actions",
    //   cell: ({ row }) => <CellActions row={row.original}/>
    // },
    
  ]