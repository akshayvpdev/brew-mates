'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ApiCall } from '@/services/Api';
import { useState } from 'react';
import Link from 'next/link';

function page() {

    
  const router = useRouter();
  const [login, setLogin] = useState({});



    

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCall("post", "auth/login", login);
      if (response && response.status === 200) {
        localStorage.setItem('AccessToken', response.data?.accessToken)
        // Show_toast("login successfull", true);
        router.push("/intrest");
      }
      else{
        console.log(error)
      }
    } catch (error) {
      
    }
  };
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
        Login
      </h1>
      <form>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
            username
          </label>
          <input
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-600">
            password
          </label>
          <input
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <a href="#" className="block text-right text-xs text-cyan-600 mt-2">
            forgot password
          </a>
        </div>
        <button
          onClick={handleLogin}
          type="button"
          className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6">
          Login
        </button>
      </form>
      <div className="text-center">
        <p className="text-sm">
          don't have an account?{" "}
          {/* <a href="#" className="text-cyan-600">
            Register
          </a> */}
          <Link href={"/"} className="text-cyan-600">
            Register
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

export default page