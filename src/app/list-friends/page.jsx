"use client";

import React, { useEffect } from "react";
import UserCard from "@/components/UserCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const YourComponent = () => {


  
  const handleGetPeople = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCall("get", "profile/sameInterestPeople");
      if (response && response.status === 200) {
        console.log(response);
      } else {
        console.log(error);
      }
    } catch (error) {}
  };




  const numberOfCards = 10;

  const userCards = Array.from({ length: numberOfCards }, (item, index) => (
    <UserCard key={index} />
  ));

  return (
    <>
      <div
        id="about"
        className="about-area content section-divide bg-gray-black ">
        {/* <div className="wrapper flex flex-wrap gap-10">{userCards}</div> */}
        <div className="hero-carousel">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={2000}
            showArrows={false}
            showStatus={false}>
            {userCards}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default YourComponent;
