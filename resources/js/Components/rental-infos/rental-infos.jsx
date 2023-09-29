import { ScrollArea } from "../ui/scroll-area"
import RentalInfo from "./rental-card"


const RentalInfos = ({rental_infos}) => {

  return (

        
        <ScrollArea className="h-[81vh]">
            {rental_infos.length > 0 ?
                rental_infos.map((rental_info) => <RentalInfo key={rental_info.id} rental_info={rental_info} />)
                : <div className='py-3 px-6 '>No Rental info Found</div>
            }
        </ScrollArea>
    
  )
}

export default RentalInfos