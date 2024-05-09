import React, {useState,useEffect} from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const NewsCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [slidesData, setslidesData] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/news/');
        const data = await response.json();
        setslidesData(data);
      } catch (error) {
        console.error('Error fetching slidesData:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='carousel-container'>
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <a href={slide.link} key={index}>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 border border-custom-gray">
                <div className="flex-1 p-4 bg-black text-white w-64">
                  <h2 className="text-xl mb-4">{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
                <div className="flex-1 max-w-sm w-64">
                  <img src={slide.photo} alt="Server Image" className="object-cover h-72 w-full"/>
                </div>
              </div>
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCarousel;
