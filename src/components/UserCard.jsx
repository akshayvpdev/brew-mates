import React from "react";
import Image from "next/image";

function UserCard() {
  return (
    
<div class="max-w-xl  border border-gray-200 rounded-lg shadow dark:bg-slate-300 dark:border-gray-700">
    <a href="#">
        <Image class="rounded-t-lg" src="/ranbir.jpg" alt="no im" height={500} width={300}/>
    </a>
    <div class="p-1 flex justify-center">
    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" style={{backgroundColor:'#ff1e7d'}}> Invite</button>
    </div>
</div>


  );
}

export default UserCard;
