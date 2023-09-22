import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ListingImages = ({images, large}) => {
  const carouselStyle = {
    width: '600px', // Set the desired width
    height: '400px', // Set the desired height
  };

  return (
    // <div className='w-[800px] h-[400px]'>
    <Carousel
        // className={
        // `${large ? "w-full h-full" : "w-[200px]  h-[100px]"}`
        // }
        width={ large ? 570 : 130}
        showArrows={true}
        showIndicators={true}
        showThumbs={false}
        infiniteLoop={true}
        stopOnHover={true}
        showStatus={false}>
          {
            images?.map((image, index) =>(
              // <div key={index} className={
              //   `${large ? " " : " h-[135px]"}`
              // }>
                  <img src={`/storage/${image}`} className='rounded-lg object-contain' />
              // </div>
            ))
          }

    </Carousel>
    // </div>

  )
}

export default ListingImages