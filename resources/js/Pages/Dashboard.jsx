import { columns } from '@/Components/dashboard/columns';
import Overview from '@/Components/overviews';
import Heading from '@/Components/ui/Heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { DataTable } from '@/Components/ui/data-table';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Separator } from '@/Components/ui/separator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getExpired, getGraphData, getRedFlag } from '@/actions/get-red-flag';
import { Head, router } from '@inertiajs/react';
import { AlertTriangle, Building } from 'lucide-react';

export default function Dashboard({rental_infos, user}) {
    const redListings = getRedFlag(rental_infos) || []
    const expiredListings = getExpired(rental_infos) || []

    const graphData = getGraphData(rental_infos) || []
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className='px-6 flex flex-col gap-3'>
                <Heading 
                title='Dashboard'
                subtitle="Overview of your rental-infos"
                />
                <Separator />
                <div className='grid md:grid-cols-3 gap-4'>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between ">
                            <CardTitle className="text-sm font-medium">
                                Total Offices
                            </CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                587
                            </div>
                        </CardContent>

                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between ">
                            <CardTitle className="text-sm font-medium">
                                Red Alert
                            </CardTitle>
                            <div className="h-4 w-4 rounded-full bg-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                {redListings.length}
                            </div>
                        </CardContent>

                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between ">
                            <CardTitle className="text-sm font-medium">
                                Rent Expired
                            </CardTitle>
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                {expiredListings.length}
                            </div>
                        </CardContent>

                    </Card>
                </div>
                <div className='grid md:grid-cols-2 gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphData} />
                    </CardContent>
                </Card>

                {/* <Card className="border-0">
                    <CardHeader>
                        <CardTitle className="text-sm">Listings</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 items-center"> */}
                        <div>
                        <div className='border rounded-lg col-span-4'>
                                    <div className="grid grid-cols-2 py-[10px] items-center justify-between p-1 px-6 text-muted-foreground text-sm font-semibold">
                                        <div>
                                            Expired within
                                        </div>
                                        <div>
                                          No of listings
                                        </div>
                                    </div>
                            {
                                graphData.map(item => (
                                    <div onClick={() => window.location.assign(`/rental-infos?Expired-Within=${item.year}`)} className="grid grid-cols-2 py-[10px] px-6 border-t text-sm hover:bg-muted cursor-pointer transition duration-150">
                                        <div>
                                         {item.year} {item.year > 1 ? 'years' : "year"} 
                                        </div>
                                        <div>
                                            {item.total}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        </div>
                    {/* </CardContent>
                </Card>
                 */}
                    
   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
