import SelectMap from "@/Components/map/map";
import RentalInfos from "@/Components/rental-infos/rental-infos";
import EmptyState from "@/Components/ui/empty-state";
import React, { useState } from "react";
import Filter from "./filter";


const RentalInfosClient = ({ data, districts, upazilas, divisions }) => {


    console.log(data)
    const isEmpty = data?.length == 0;
    const [select, setSelect] = useState(null);
    const [open, setOpen] = useState(false)
    const [activeFilter, setActiveFilter] = useState([
    ])
    const [ filteredRentalInfos, setFilteredRentalInfos] = useState(data)

    return (
        <div>
            {isEmpty ? (
                // <Container>
                <EmptyState showReset />
            ) : (
                // </Container>
                <div className="grid h-full  lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="h-full overflow-y-hidden space-y-1">
                        {/* <div className="border flex items-center  p-2 rounded-lg ">
                            
                            <div className="flex items-center gap-2">
                            <Badge>
                                <SlidersHorizontal className="h-3 w-3" />
                            </Badge>
                            <Button
                                variant="outline"
                                size="small"
                                className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] text-neutral-400"
                            >
                                <MapPinIcon className="w-3 h-3 " />
                                Location
                            </Button>
                            
                            <Button
                                variant="outline"
                                size="small"
                                className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] text-neutral-400"
                            >
                                <FileTypeIcon className="w-3 h-3 " />
                                Rent Type
                            </Button>
                            
                            <Button
                                variant="outline"
                                size="small"
                                className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] text-neutral-400"
                            >
                                <CheckCircle className="w-3 h-3 " />
                                Approval
                            </Button>
                            
                            <Button
                                variant="outline"
                                size="small"
                                className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] text-neutral-400"
                            >
                                <HeartHandshake className="w-3 h-3 " />
                                Tensure
                            </Button>

                            </div>
                        </div> */}
                        
                            <Filter divisions={divisions} districts={districts} upazilas={upazilas}/>  
                        
                            
                        <RentalInfos
                            rental_infos={filteredRentalInfos}
                            select={select}
                            setSelect={setSelect}
                        />
                    </div>
                    <div className="lg:flex h-[87vh] hidden">
                        <SelectMap rental_infos={data} value={select} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RentalInfosClient;
