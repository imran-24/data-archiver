import { ScrollArea } from "@/Components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    BookMarked,
    CheckCircle,
    FileTypeIcon,
    HeartHandshake,
    LocateFixed,
    MapPinIcon,
    SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

const Custom = ({ divisions, districts, upazilas }) => {
    const [filters, setFilters] = useState({
        division: "",
        distinct: "",
        upazila: "",
    });
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filter</h4>
                        <p className="text-xs text-muted-foreground">
                            Set the filter for listing.
                        </p>
                    </div>

                </div>

                <div className="py-4 flex gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="small"
                                className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] text-neutral-400"
                            >
                                <MapPinIcon className="w-3 h-3 " />
                                Location
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        Divisions
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {divisions.map((item) => (
                                                <DropdownMenuCheckboxItem
                                                    
                                                >
                                                    {item.label}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>

                                
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
            </PopoverContent>
        </Popover>
    );
};
export default Custom;
