import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductSlider({ items }) {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    draggable: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className=" w-full">
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex flex-col items-center shadow-xl">
            <img src={item.image} alt="" className=" aspect-auto " />
            <h3>asdfasdf</h3>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default ProductSlider;
