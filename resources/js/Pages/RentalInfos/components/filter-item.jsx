"use client"

import * as React from "react"
import qs from 'query-string'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, CheckIcon } from "lucide-react"
import { Separator } from "@/Components/ui/separator"
import { Badge } from "@/Components/ui/badge"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { usePage } from "@inertiajs/react"
import { useParams, useSearchParams } from "react-router-dom"






const FilterItem = (
   {data: frameworks, label, icon: Icon}
    ) => {
        
  
//   const frameworks = stores.map(store =>({
//     label: store.name,
//     value: store.id
//   }))
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')



  let [searchParams, setSearchParams] = useSearchParams();
   

  const currentItem = frameworks.find((framework) => framework.label === value)
  const onSelectItem = ((item)=>{
        setValue(item.label === value ? "" : item.label)
        setOpen(false)
        // router.push(`/${store.value}`)
  })
  let currentQuery = []
  React.useEffect(()=>{
    
    if(searchParams.size) {
      console.log('hi')
    }

    // const updatedQuery = {
    //   ...currentQuery,
    //   [label]: value
    // }
    // // console.log(updatedQuery)

    // // if (params?.get(label) === label) {
    // //   delete updatedQuery.category;
    // // }

    // const url = qs.stringifyUrl({
    //   url: '/',
    //   query: updatedQuery
    // }, { skipNull: true });

    // route

  },[value])
  

  return (
    
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//       <Button
//         variant="outline"
//         size="small"
//         className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] text-neutral-400"
//     >
//         <Icon className="w-3 h-3 " />
//         {label}
//       </Button>
//       </PopoverTrigger>
      
//       <PopoverContent className="w-[240px]  p-0 m-0">

//         <Command>
//           {
//             label === "Location" &&
//             <>
//             <CommandInput placeholder={`Search by ${label.toLowerCase()}...`} className="h-9" />
//             <CommandEmpty>No {label} found.</CommandEmpty>
//             </>
//           }
//             <CommandGroup>
//             <ScrollArea className={`${label === "Location" ? 'h-96' : 'h-auto' }`}>
//             {frameworks.map((framework, index) => (
//               <CommandItem
//               className="cursor-pointer gap-2"
//                 key={index}
//                 onSelect={()=> onSelectStore(framework)}
//               >
//                 {/* <StoreIcon className="mr-3 h-4 w-4 " /> */}
//                 <div className="flex-1">{framework.label}</div>
//                 {framework.title && <Badge variant={'outline'}  className='text-[8px] ml-auto '>{framework.title}</Badge >
// }
//                 <CheckIcon
//                   className={cn(
//                     "ml-auto h-4 w-4 ",
//                     // currentItem?.value === framework.value ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//               </CommandItem>
//             ))}
//             </ScrollArea>
//           </CommandGroup>  
//         </Command>

//       </PopoverContent>
      
//     </Popover>

<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <Button
        variant={'outline'}
        size="small"
        className={cn("items-center gap-1 rounded-full px-2 py-1 text-[10px]", value ? "text-black" : 'text-neutral-400')}
    >
        <Icon className="w-3 h-3 " />
        {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label
            :  */}
            {label}
          
      </Button>
        
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
        <CommandInput placeholder={`Search by ${label.toLowerCase()}...`} className="h-9" />
        <CommandEmpty>No {label} found.</CommandEmpty>
          <CommandGroup>
          <ScrollArea className={`${label === "Location" ? 'h-96' : 'h-auto' }`}>            
          {frameworks.map((framework, index) => (
              <CommandItem
                key={index}
                onSelect={() => onSelectItem(framework)}
              >
                <CheckIcon
                  className={cn(
                    "mr-3 h-4 w-4 ",
                    currentItem?.value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex-1">{framework.label}</div>
                {framework.title && <Badge variant={'outline'}  className='text-[8px] ml-auto '>{framework.title}</Badge >}
              </CommandItem>
            ))}
          </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FilterItem
