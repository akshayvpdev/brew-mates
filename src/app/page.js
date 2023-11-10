"use client";

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ApiCall } from '@/services/Api';
import { useState } from 'react';
import Link from 'next/link';
import { handleGetLocation } from '@/utils/geoLocation';

export default function Home() {


  let router = useRouter()
  const[loading,setLoading]=useState()
    const[formData,setFormdata]=useState({
        name:'',
        email:'',
        phone:'',
        password:'',

    })
    console.log(formData)

    const handleRegister=async()=>{
      try{
        let location = await handleGetLocation()
        console.log(location)
        if(location){     
          const response = await ApiCall('Post','auth/signup',{
            ...formData,
            location: {
              coordinates: [location.latitude, location.longitude],
            },
          })
          router.push('/login')
          console.log(response)
        }else{
        await ApiCall('Post','auth/signup',formData)
        }
       
      }
      catch(error){
        console.log(error)
      }
    }



  return (
<div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
        <Image
            src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
            alt="Logo"
            className="w-30 h-20"
            height={75}
            width={150}
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
          Register
        </h1>

        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              name
            </label>
            <input
              onChange={(e)=>setFormdata({...formData,name:e.target.value})}
              type="name"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-600">
              Email
            </label>
            <input
             onChange={(e)=>setFormdata({...formData,email:e.target.value})}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              phone
            </label>
            <input
              onChange={(e)=>setFormdata({...formData,phone:e.target.value})}
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              onChange={(e)=>setFormdata({...formData,password:e.target.value})}

            />
          </div>

          <button
            onClick={(e)=>{
              e.preventDefault()
              handleRegister()}}
            type="button"
            className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6">
            Register
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm">
            you already have an account?{" "}
            <Link href="/login" className="text-cyan-600">
              Login
            </Link>
          </p>
        </div>
        <p className="text-xs text-gray-600 text-center mt-10">
          © 2023 WCS LAT
        </p>
      </div>
    </div>
  )
}
