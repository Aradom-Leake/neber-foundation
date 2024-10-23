import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

const MultiImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust autoplay speed in milliseconds
    responsive: [
      {
        breakpoint: 760, // Adjust breakpoint according to your preference
        settings: {
          slidesToShow: 2, // Show two images per slide on smaller screens
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="card">
      {images.map((image, index) => (
        <>
          <div key={index} className="slick">
            <img
              src={image.image}
              alt={`Slide ${index + 1}`}
              className="slickimg"
            />

            <div className="slick-title">{image.title}</div>
          </div>
        </>
      ))}
    </Slider>
  );
};

export default MultiImageSlider;
