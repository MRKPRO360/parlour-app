import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";

import gallery1 from "../../../../assets/images/service-1.jpg";
import gallery2 from "../../../../assets/images/service-2.jpg";
import gallery3 from "../../../../assets/images/service-3.jpg";
import gallery4 from "../../../../assets/images/service-4.jpg";
import gallery5 from "../../../../assets/images/service-5.jpg";
import gallery6 from "../../../../assets/images/service-6.jpg";
import Slide from "./Slide";

const photos = [
  { img: gallery1 },
  { img: gallery2 },
  { img: gallery3 },
  { img: gallery4 },
  { img: gallery5 },
  { img: gallery6 },
];

function PhotoGallery() {
  const swiperSlideStyles = {
    width: "270px",
    height: "300px",
    overflow: "hidden",
    borderRadius: "5px",
  };

  const [loopTrigger, setLoopTrigger] = useState(false);
  const setSlidesLoop = () => {
    setLoopTrigger(window.innerWidth >= 1023 ? true : false);
  };

  useEffect(() => {
    // Initially set the amount of slides on page load
    setSlidesLoop();
    // Add the event listener on component mount
    window.addEventListener("resize", setSlidesLoop);
    // Remove the listener on unmount
    return () => {
      window.removeEventListener("resize", setSlidesLoop);
    };
  }, []);
  return (
    <div className="pt-36 pb-28">
      <h2 className="text-3xl text-center font-bold mb-16">
        Our <span className="text-pink-600">Special Care</span>
      </h2>
      <Swiper
        loop={loopTrigger}
        effect={"coverflow"}
        slidesPerView={3}
        grabCursor={true}
        centeredSlides={false}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {photos.map((el, i) => (
          <SwiperSlide style={swiperSlideStyles}>
            <Slide key={i} gallery={el.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PhotoGallery;
