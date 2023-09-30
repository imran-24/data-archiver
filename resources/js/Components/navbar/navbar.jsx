import { Link, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import UserMenu from "./user-menu";
import Logo from "./logo";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useSearchParams } from "react-router-dom";

const Navbar = () => {
    const [search, setSearch] = useState('')
    const href = window.location.href

    const { props } = usePage();
    const user = props.auth.user;
    let [searchParams, setSearchParams] = useSearchParams();
    const pathname = window.location.pathname
    
    const handleSearch = () =>{
        const params = {}
        params.search = search
        setSearchParams(params)
        router.visit(window.location.href)
    }

    // const pathname = window.location.pathname;

    // const active = {
    //     dashboard: pathname === "/dashboard",
    //     listings: pathname === "/rental-infos",
    //     rental_infos: pathname === "/listings",
    // };
    return (
        <div className="border md:px-6 h-[60px]">
            <div className="py-2">
                <div className="flex items-center gap-3">
                    {/* left */}
                    <Logo />
                    {/* middle */}
                    <div className="grid justify-center">
                        {/* <div className='flex items-center gap-3'>
                        <Link href={ route('dashboard') } className={`text-[13px] font-medium transition hover:text-primary ${active['dashboard'] ? 'text-black' : 'text-gray-400'}`}>
                            Dashboard
                        </Link>
                        <Link 
                        href={ route('rental-infos.index') } 
                        className={`text-[13px] font-medium transition hover:text-primary ${active['listings'] ? 'text-black' : 'text-gray-400'}`}>
                            Rental Info
                        </Link>
                        {
                        user.is_admin ?
                            <Link 
                            href='/listings' 
                            method='get' className={`text-[13px] font-medium transition hover:text-primary ${active['rental_infos'] ? 'text-black' : 'text-gray-400'}`}>
                                Listings
                            </Link>
                            : null
                        }
                        
                        </div> */}
                        {pathname == "/rental-infos"  && 
                        <Sheet className="bg-transparent">
                            <SheetTrigger asChild>
                                <div className="w-[300px] border border-neutral-200 rounded-full hover:border-neutral-300 ">
                                    <Button
                                        variant={"ghost"}
                                        className="text-neutral-400 font-normal w-full rounded-full flex justify-start"
                                    >
                                        <Search className="h-5 w-5 mr-2 " />
                                        Search...
                                    </Button>
                                </div>
                            </SheetTrigger>
                            <SheetContent className="lg:max-w-5xl  m-auto bg-transparent shadow-none border-none" side={"top"}>
                                <SheetHeader >
                                    <SheetTitle className="text-2xl">Search</SheetTitle>
                                    <SheetDescription className="text-xs">
                                        Search specific rental information
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid grid-cols-1 gap-4 justify-center py-4">
                                    
                                    <Input
                                        className="focus-visible:ring-indigo-500 h-16 text-xl"
                                        onChange={(e)=> setSearch(e.target.value)}
                                        
                                        // className="col-span-"
                                    />
                                </div>
                     
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button onClick={handleSearch} className="w-[200px] " type="submit">
                                            Search
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>}
                        
                    </div>
                    {/* right */}
                    <div className="ml-auto flex items-center gap-3 relative">
                        <UserMenu currentUser={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
