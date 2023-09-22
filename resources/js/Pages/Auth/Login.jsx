"use client"

import GuestLayout from '@/Layouts/GuestLayout';


import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Head, router } from '@inertiajs/react';
import Heading from '@/Components/ui/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "password must be at least 20 characters.",
  }),
})

const Login = ()=> {
  const [loading, setLoading] = useState(false)
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values) {
    setLoading(true)

    axios.post('login', values)
    .then(() => {
      router.visit('/dashboard')
      toast.success("Logged in")
    })
    .catch(({response}) => {
      toast.error(response?.data?.message)
      // router.reload()
      // console.log(response?.data?.message)
        
    }).finally(()=> setLoading(false))
  }

  return (
    <GuestLayout>
        <Head title="Register" />
      
      <div className='space-y-2'>
      <Heading
      title={'Login'}
      subtitle={'Welcome back'}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={loading} type="email" placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input disabled={loading} type="password" placeholder="Type a strong password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
           className="mt-4"
           disabled={loading}
           type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    </GuestLayout>
  )
}

export default Login