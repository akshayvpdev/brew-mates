import React from 'react'
import HeroCarousel from '@/components/Herocarousel'
import Navbar from '@/components/Header'
import Image from 'next/image'


function page() {
  return (

    <div id="about"  className="about-area content section-divide bg-gray-black">
    <section className="px-6 md:px-20 py-24 ">
      <div className="flex max-xl:flex-col gap-16">
        <div className="flex flex-col justify-center">
          <p className="small-text">
            Smart Shopping Starts Here
            <Image
              src="/assets/icons/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
            />
          </p>
          <h1 className="head-text text-red-200">
          Because Love Tastes Better with <span className="text-red"> Coffee</span>
            
          </h1>
          <p className="mt-6">
            Powerfull self-serve product and growth analytics to help you
            convert, engage, and retain more
          </p>
          {/* <SearchBar /> */}
        </div>
        <HeroCarousel />
      </div>
    </section>

    {/* <section className="trending-section">
      <h2 className="section-text">Trending</h2>

      <div className="flex flex-wrap gap-x-6 gap-y-16">
        {["apple Iphone 15", "Book", "Sneakers"].map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </section> */}
    </div>

  )
}

export default page