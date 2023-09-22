import SelectMap from "@/Components/map/map";
import DetailItem from "@/Components/ui/DetailItem";
import CategoryInput from "@/Components/ui/category-input";
import selectedListing from "@/hooks/selectdListing";
import { floorList, getValue } from "@/lib/utils";
import React, { useEffect } from "react";

const RentalInfoClient = ({
    data: rental_info,
    divisions,
    districts,
    upazilas,
}) => {


    let floor_list = floorList(rental_info);
    

    const selected = selectedListing(state => state.selected);
    const onSelect = selectedListing(state => state.onSelect(''));

    useEffect(()=>{
        if(selected) onSelect
    },[selected, onSelect])

    return (
        <div className="px-10 ">
            <div className="flex items-center justify-between pb-4 border-b">
                <div className="text-lg ">Detail Rental Information</div>
            </div>
            <div className="flex flex-col w-full m-auto max-h-full mt-3">
                <div className="flex-1 ">
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 pb-4">
                        <DetailItem
                            small
                            title="Office Name"
                            subtitle={rental_info.office_name}
                        />

                        {rental_info?.previous_name && (
                            <DetailItem
                                small
                                title="Previous Name"
                                subtitle={rental_info.previous_name}
                            />
                        )}
                        <DetailItem
                            small
                            title="Address"
                            subtitle={rental_info.address}
                        />
                        <DetailItem
                            small
                            title="Division"
                            subtitle={getValue(divisions, rental_info.division)}
                        />
                        <DetailItem
                            small
                            title="Destrict"
                            subtitle={getValue(districts, rental_info.district)}
                        />
                        <DetailItem
                            small
                            title="Upazila"
                            subtitle={getValue(upazilas, rental_info.upazila)}
                        />

                        <DetailItem
                            small
                            title="Rent Type"
                            subtitle={`${rental_info.type_of_rent} years`}
                        />

                        <DetailItem
                            small
                            title="Head Office Approval Status"
                            subtitle={
                                rental_info.head_office_approval === 0
                                    ? "Not Approved"
                                    : "Approved"
                            }
                        />

                        <DetailItem
                            small
                            title="Start date of the aggrement"
                            subtitle={rental_info.starting_date}
                        />

                        <DetailItem
                            small
                            title="Rent per Square"
                            subtitle={`${rental_info.rent_per_sqft} Taka`}
                        />

                        <DetailItem
                            small
                            title="Floor Space"
                            subtitle={`${rental_info.floor_space} sqft`}
                        />

                        <DetailItem
                            small
                            title="Year of construction"
                            subtitle={`${rental_info.year_of_construction}`}
                        />

                        <DetailItem
                            small
                            title="Tensure of the lease aggrement"
                            subtitle={`${rental_info.tensure_of_lease_aggrement} years`}
                        />

                        <DetailItem
                            small
                            title="Expiry date of the aggrement"
                            subtitle={`${rental_info.expiry_date_of_aggrement}`}
                        />
                        <div>
                            <DetailItem small title="Floor Positions" />
                            <div className="flex items-center flex-wrap gap-1">
                                {floor_list?.map((floor) => (
                                    <CategoryInput key={floor} label={floor} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 col-span-full w-full h-[398px] lg::h-full">
                            <DetailItem
                                small
                                title="Office location "
                                subtitle="See the location in map!"
                            />
                            <SelectMap latitude={rental_info.latitude} longitude={rental_info.longitude}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalInfoClient;
