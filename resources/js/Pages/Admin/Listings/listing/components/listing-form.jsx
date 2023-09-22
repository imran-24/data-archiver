'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { CalendarIcon, Trash } from 'lucide-react'

// import AlertModal from '@/Components/modals/alert-modal'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import axios from 'axios'

import toast from 'react-hot-toast'
import Heading from '@/Components/ui/Heading'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { cn, floorPosition, getValue, rentType } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { addYears, format, getYear } from 'date-fns'
import { Calendar } from '@/Components/ui/calendar'
import Checkbox from '@/Components/Checkbox'
import { MultiSelect } from '@/Components/ui/multi-select'
import SelectMap from '@/Components/map/map'
import { router } from '@inertiajs/react'
import AlertModal from '@/Components/modals/alert-modal'





// form schema
const formSchema = z.object({
  office_name: z.string().min(2),
  previous_name: z.string().min(2),
  type_of_rent: z.string().min(1),
  head_office_approval: z.boolean().default(false).optional(),
  building_type: z.string().min(2),
  year_of_construction: z.date(),
  floor_space: z.coerce.number().min(1),
  rent_per_sqft: z.coerce.number().min(1),
  tensure_of_lease_aggrement: z.coerce.number().min(1),
  starting_date: z.date(),
  floor_position: z.array(z.string()).min(1),
  address: z.string().min(2),
  division: z.string().min(1),
  district: z.string().min(1),
  upazila: z.string().min(1),
  location: z.object({
    lng: z.number().min(-180).max(180), // Realistic range for longitude
    lat: z.number().min(-90).max(90),   // Realistic range for latitude
  })
  })

const ListingForm = ({
    initialData,
    divisions,
    districts,
    upazilas
}) => {
  
   // 1. Define your form.
   const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ||  {
      'office_name': "",
      'previous_name': "",
      'type_of_rent': "",
      'head_office_approval': false,
      'building_type': "",
      'year_of_construction': "",
      'floor_space': "",
      'floor_position': [],
      'rent_per_sqft': '1000',
      'tensure_of_lease_aggrement': '1',
      'starting_date': "",
      'address': "",
      'division': "",
      'district': "",
      'upazila': "",
      'location': null,
      
    }
    })

 
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  
  const [filter_districts, set_filter_districts] = useState([])
  const [filter_upazilas, set_filter_upazilas] = useState([])

  const division = form.watch('division')
  const district = form.watch('district')
  const location = form.watch('location')
  

  // useEffect(()=>{
  //   if(division){
  //       form.setValue('district', '')
  //       form.setValue('upazila', '')
  //   }
  // },[division])

  useEffect(()=>{
    if(division) {

        const temp = districts.filter(district => division == district.division_id);

        set_filter_districts(temp)
    }
  },[division, set_filter_districts])

  useEffect(()=>{
    if(district) {

        const temp = upazilas.filter(upazila => district == upazila.district_id);

        set_filter_upazilas(temp)
    }
  },[district, set_filter_upazilas])

  const onDelete = async() =>{
    try{
        setLoading(true)
        const response = await axios.delete(`/listings/${initialData.id}`)
        toast.success("Listings deleted")
        window.location.assign('/listings')

    }catch(error){
        setLoading(false)
        toast.error("Something went wrong")
    }finally{
        setLoading(false)
    }
  }

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // console.log(typeof(format(addYears(new Date(values.date_of_starting), 0), 'yyyy-MM-dd')), typeof(format(addYears(new Date(values.date_of_starting), values.tensure_of_lease_aggrement), 'yyyy-MM-dd')))
    try{
      
      const formatedData = {
        ...values,       
        'head_office_approval_date': values.head_office_approval  ? new Date() : null,
        'year_of_construction': getYear(values.year_of_construction),
        'starting_date': format(new Date(values.year_of_construction), 'yyyy-MM-dd'),
        //  getYear(values.year_of_construction),
        // 'date_of_starting': format(new Date(values.date_of_starting), 'yyyy-MM-dd'),
        // format(new Date(values.date_of_starting), 'yyyy-MM-dd'),
        'expiry_date_of_aggrement': format(addYears(new Date(values.starting_date), values.tensure_of_lease_aggrement), 'yyyy-MM-dd'),
        'status': false
      }

      setLoading(true);
        if(initialData){
          const response = await axios.patch(`/listings/${initialData?.id}`, formatedData)
        }else{
          const response = await axios.post('/listings', formatedData)
        }       
        router.visit('/listings')
        toast.success(toastMessage);
        // router.refresh()
    }catch(error){
        setLoading(false)
        console.log(error)
        toast.error("Something went wrong")
    }finally{
        setLoading(false);
    }

    
  }


  const title = initialData ? "Edit Listing" : "Create Listing"
  const subtitle = initialData ? "Edit this Listing" : "Create a new Listing"
  const toastMessage = initialData ? "Listing updated" : "Listing created"
  const actionLabel = initialData ? "Save changes" : "Create"

  return (
    <>
    <AlertModal
    isOpen={open}
    disabled={loading}
    onCancel={()=> setOpen(false)}
    onConfirm={onDelete}
    />
    <div className='flex items-center justify-between'>
        <Heading 
        title={title}
        subtitle={subtitle}
        />
        {initialData && 
        <Button
        size='icon'
        onClick={()=> setOpen(true)}
        variant='destructive'>
            <Trash className='h-4 w-4' />
        </Button>}
    </div>
    <Separator />
    <div className='py-2 space-y-4 pb-4'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      
      <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-center gap-2'>
        
        <FormField
          control={form.control}
          name="office_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Name</FormLabel>
              <FormControl>
                <Input  
                disabled={loading}
                placeholder="Present office name" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="previous_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Name</FormLabel>
              <FormControl>
                <Input  
                disabled={loading}
                placeholder="Previous office name" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input  
                disabled={loading}
                placeholder="Present address" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="division"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Division</FormLabel>
              <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a division" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {
                        divisions.map(item => (
                            <SelectItem 
                            key={item.value}
                            value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))
                    }                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {
                        filter_districts.map(item => (
                            <SelectItem 
                            key={item.value}
                            value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))
                    }                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="upazila"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upazila</FormLabel>
              <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Upazila" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {
                        filter_upazilas.map(item => (
                            <SelectItem 
                            key={item.value}
                            value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))
                    }                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="type_of_rent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rent Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select rent type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
              {
                rentType.map(item => (
                  <SelectItem 
                  key={item.value} 
                  value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              }
              </SelectContent>
            </Select>
            
            <FormMessage />
          </FormItem>
        )}
      />

        {/* <FormField
          control={form.control}
          name="type_of_rent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent type</FormLabel>
              <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Type of rent"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {
                        rentType.map(item => (
                            <SelectItem 
                            key={item.value}
                            value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))
                    }                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="rent_per_sqft"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent/sqrft </FormLabel>
              <FormControl>
                <Input 
                type="number" 
                disabled={loading}
                placeholder="Rent per squre feet" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="building_type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Building type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Own" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Own
                    </FormLabel>
                  </FormItem>
      
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Lease" />
                    </FormControl>
                    <FormLabel className="font-normal">Lease</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem> 
          )}
        />

        <FormField
          control={form.control}
          name="starting_date"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center gap-y-2">
              <FormLabel >Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }

                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tensure_of_lease_aggrement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tensure </FormLabel>
              <FormControl>
                <Input 
                type="number" 
                disabled={loading}
                placeholder="Tensure of the lease aggrement" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="floor_space"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor space </FormLabel>
              <FormControl>
                <Input 
                type="number" 
                disabled={loading}
                placeholder="Floor space of the bulding" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year_of_construction"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center gap-y-2">
              <FormLabel >Construction Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }

                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <FormField
          control={form.control}
          name="head_office_approval"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onChange={event => field.onChange(event.target.checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Headoffice approval 
                </FormLabel>
                <FormDescription>
                  Check only if head office approves.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="floor_position"
          render={({ field }) => (
          <FormItem>
            <FormLabel>Select floor position</FormLabel>
                <MultiSelect
                    selected={field.value}
                    options={floorPosition}
                    {...field}
                    
                    className="sm:w-[360px]"
                />
            <FormMessage />
        </FormItem>
        )} 
        />


        
            <div className='flex flex-1 flex-col gap-6 pb-6 col-span-full  w-full   lg:h-full '>
            <Heading 
            title='Where is your office located?'
            subtitle='Help us find you!'
            small
            />
            <SelectMap 
            value={location}
            showSearch
            onChange={(value)=> form.setValue('location', value)}/>
            </div>
           
        

        <Button 
        disabled={loading}
        type="submit">
          {actionLabel}
        </Button>

        </div>
        
      </form>
    </Form>
    </div>
    </>
  )
}

export default ListingForm