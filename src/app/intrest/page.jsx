"use client";

import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

function page() {
  const router = useRouter();
  const [FormData, setFormData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(selectedOptions)

  console.log(FormData);

  const options = [
    { value: "music", label: "Music" },
    { value: "travel", label: "Travel" },
    { value: "Food", label: "food" },
    { value: "art", label: "Art " },
    { value: "movies", label: "Movies" },
    { value: "sports", label: "Sports" },
  ];

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };


  const getToken = async() => {
    let token = localStorage.getItem('AccessToken')
    try {
      const decoded =await jwtDecode(token);
      console.log(decoded)
      return decoded?.id
      // setUser({
      //   user_id:decoded?.id,
      //   token:token,
      //   role:decoded?.role
      // });
    } catch (err) {
      // Show_Toast('invalid token',false)
      console.log('Invalid token');
    }
  };



  const handleUpdate = async () => {
    let id = getToken()
    if(id){
      let formData={...FormData,interest:[...selectedOptions]}
      console.log(formData)
      try {
        // const response = await ApiCall("patch", `profile/${id}`,FormData);
        // if (response && response.status === 200) {
        //   console.log(response);
        // } else {
        //   console.log(error);
        // }
      } catch (error) {}
    }
   
  };


  const handlSubmit=()=>{
    e.preventdefault()
    handleUpdate()
  }



  useEffect(()=>{
    getToken()
  },[])

  return (
    <>
      <div className="container h-screen flex align-middle justify-center  ">
        <div>
          <form className="w-full max-w-lg  mt-56">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state">
                  Gender
                </label>
                <select
                  onChange={(e) =>
                    setFormData({ ...FormData, gender: e.target.value })
                  }
                  value={FormData?.gender}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state">
                  <option value="gender">gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state">
                  Sexuality
                </label>
                <select
                   onChange={(e) =>
                    setFormData({ ...FormData, sexuality: e.target.value })
                  }
                  value={FormData?.sexuality}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state">
                  <option value="straight">Straight</option>
                  <option value="gay">Gay</option>
                  <option value="lesbian">Lesbian</option>
                  <option value="bisexual">Bisexual</option>
                  <option value="asexual">asexual</option>
                  <option value="demisexual">demisexual</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
              <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state">
                  interest
                </label>
                <Select
                    onChange={handleSelectChange }
                    value={selectedOptions}
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              // onClick={handleUpdate}
              onClick={()=>router.push('/dashboard')}
              >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
