import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import ToastProvider from '@/providers/toast-provider';
import Navbar from '@/Components/navbar/navbar';
import { ScrollArea } from '@/Components/ui/scroll-area';

export default function Authenticated({ children }) {

    return (
        <div className="h-screen ">
            <ToastProvider />
            <Navbar />
            <div className='pt-4'>
            {/* <ScrollArea className="h-[89vh] w-[100vw]"> */}
                <main>{children}</main>
            {/* </ScrollArea> */}
            </div>
        </div>
    );
}
