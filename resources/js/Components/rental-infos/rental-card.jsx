import React from "react";

import selectedListing from "@/hooks/selectdListing";
import {
  Card,

} from "@/components/ui/card"

import RentalInfoData from "./rental-info-data";
import RentalInfoFooter from "./rental-info-footer";

const RentalInfo = ({ rental_info }) => {
    const { selected, onSelect } = selectedListing();
    return (
        //

        <Card>
            <div
                // onClick={router.visit(`/listings/${rental_info.id}`)}
                onClick={() => onSelect(rental_info.id)}
                className={`
                flex
                py-3

                hover:shadow-lg
                px-6
                hover:border-l-[4px]
                cursor-pointer
                transition-all
                transform
                duration-200
                ease-in-out
                border-yellow-500
                gap-3
                ${selected === rental_info.id && "border-l-[4px]"}`}
                >
                <div className="">
                    <img
                        src="./rupali-bank.png"
                        className="h-[160px]  rounded-md object-cover"
                        alt=""
                    />

                </div>
                <div className="flex flex-1 flex-col justify-between  relative">
                    <RentalInfoData
                        name={rental_info.office_name}
                        approval={rental_info.head_office_approval}
                        start_date={rental_info.starting_date}
                        end_date={rental_info.expiry_date_of_aggrement}
                        floors={rental_info.floor_position}
                    />

                    <RentalInfoFooter
                        rental_info={rental_info}
                        price={rental_info.rent_per_sqft}
                        space={rental_info.floor_space}
                    />
                </div>
            </div>
        </Card>
    );
};

export default RentalInfo;
