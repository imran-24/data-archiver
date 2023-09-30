"use client";

import React, { useCallback, useState } from "react";
import Avater from "../avater";
import { AiOutlineMenu } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link, router, usePage } from "@inertiajs/react";
import MenuItem from "./menu-item";

const UserMenu = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAction = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    return (
        <div className="relative">
            {/* <div className='flex items-center gap-3'>
            
            <div
                onClick={toggleAction}
                className='
                flex items-center gap-3
                border 
                rounded-full 
                p-3
                md:px-2
                md:py-1
                shadow-sm
                cursor-pointer 
                hover:shadow-md 
                transition 
                '>
                <AiOutlineMenu />
                <div className='hidden md:flex'>
                    <Avater />
                </div>
            </div>
        </div> */}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* <Button variant="ghost"> */}
                        <div className="flex items-center gap-3">
                            <div
                                onClick={toggleAction}
                                className="
                                    flex items-center gap-3
                                    border 
                                    rounded-full 
                                    p-3
                                    md:px-2
                                    md:py-1
                                    shadow-sm
                                    cursor-pointer 
                                    hover:shadow-md 
                                    transition 
                                    "
                            >
                                <AiOutlineMenu />
                                <div className="hidden md:flex">
                                    <Avater />
                                </div>
                            </div>
                        </div>
                    {/* </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem on>
                        <Link href='/dashboard'>
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.assign('/rental-infos')}>
                        {/* <Link href='/rental-infos' > */}
                            Rental Info
                        {/* </Link> */}
                    </DropdownMenuItem>
                    {currentUser.is_admin  ?
                     <DropdownMenuItem>
                        <Link href='/listings' >
                           Listings
                        </Link>
                    </DropdownMenuItem>
                    : <></>}
                    <DropdownMenuItem>
                        <Link href='/critical-listings' >
                           Critical Listings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href='/expired-listings' >
                           Rent Expired
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem >
                        
                        <Link href="/logout" as="button" method="post">
                            Log out
                        </Link>
                        
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserMenu;
