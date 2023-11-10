'use client'
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const HeroCarousel = () => {

  const heroImages = [
    { imgUrl: "/assets/images/carousel-1.jpg", alt: "smartwatch" },
    { imgUrl: "/assets/images/carousel-1.jpg", alt: "smartwatch" },
  ];
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}>
        {heroImages.map((image) => (
          <Image
            key={image.alt}
            src={image.imgUrl}
            alt={image.alt}
            height={484}
            width={484}
            className="object-oriented"
          />
        ))}
      </Carousel>

      <Image src="assets/icons/hand-drawn-arrow.svg" alt="arrow" width={175} height={175} className="max-xl:hidden -left-[15%] bottom-0"/>
    </div>
  );
};

export default HeroCarousel;
