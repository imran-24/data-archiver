import Filter from "@/Components/filter/filter";
import SelectMap from "@/Components/map/map";
import RentalInfos from "@/Components/rental-infos/rental-infos";
import Heading from "@/Components/ui/Heading";
import { Card, CardTitle } from "@/Components/ui/card";
import EmptyState from "@/Components/ui/empty-state";
import { Separator } from "@/Components/ui/separator";
import { getRedFlag } from "@/actions/get-red-flag";
import React, { useState } from "react";


const CriticalListingsClient = ({ data, districts, upazilas, divisions }) => {
    
    const redListings = getRedFlag(data) || []
    const isEmpty = redListings?.length == 0;
    const [select, setSelect] = useState(null);
    const [open, setOpen] = useState(false)
    const [activeFilter, setActiveFilter] = useState([
    ])
    const [ filteredRentalInfos, setFilteredRentalInfos] = useState(redListings)

    return (
        <div>
            
            {isEmpty ? (
                // <Container>
                <EmptyState showReset />
            ) : (
                // </Container>
                <div className="grid h-full pt-3 lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="h-full overflow-y-hidden space-y-1">
                        
                            <Card className="flex flex-col gap-2 px-6 py-2">
                                <div className="font-medium ">Critical Listings</div>
                            </Card>
                        
                            
                        <RentalInfos
                            rental_infos={filteredRentalInfos}
                            select={select}
                            setSelect={setSelect}
                        />
                    </div>
                    <div className="lg:flex h-[88vh]  hidden">
                        <SelectMap rental_infos={redListings} value={select} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CriticalListingsClient;
