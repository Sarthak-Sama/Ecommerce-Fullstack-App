import React, { useState, useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import ProductCard from "../components/partials/ProductCard";

const Carousel = ({ data }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 1000; // Adjust based on your card width + gap

    if (direction === "left") {
      container.scrollTo({
        left: scrollPosition - scrollAmount,
        behavior: "smooth",
      });
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
    } else {
      container.scrollTo({
        left: scrollPosition + scrollAmount,
        behavior: "smooth",
      });
      setScrollPosition(
        Math.min(
          container.scrollWidth - container.clientWidth,
          scrollPosition + scrollAmount
        )
      );
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-[0%] top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md"
        disabled={scrollPosition === 0}
      >
        <RiArrowLeftSLine size={24} />
      </button>

      <div
        ref={carouselRef}
        className="flex gap-5 my-5 overflow-x-hidden scroll-smooth"
      >
        {data.map((item, index) => (
          <div key={index} className="flex gap-5 flex-shrink-0">
            <ProductCard product={item} />
            <ProductCard product={item} />
            <ProductCard product={item} />
            <ProductCard product={item} />
            <ProductCard product={item} />
            <ProductCard product={item} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md"
        disabled={
          carouselRef.current &&
          scrollPosition >=
            carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        }
      >
        <RiArrowRightSLine size={24} />
      </button>
    </div>
  );
};

export default Carousel;
