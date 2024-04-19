import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import BannerImg from "./BannerImg";
import YouTube from "react-youtube";

const renderSlides = BannerImg.map((image, index) => (
  <div key={index}>
    <img src={image.url} className="banner-img" alt={image.alt} />
  </div>
));

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleChange(index) {
    setCurrentIndex(index);
  }

  return (
    <div>
      <div>
        <YouTube
          videoId="Xm_lnAIclY0" //동영상 주소
          opts={{
            width: "100%",
            height: "400",
            playerVars: {
              autoplay: 0, //자동 재생 1 / 자동 재생X 0
              rel: 0, //관련 동영상 표시하지 않는다
              modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 하지 않는다
              loop: 0, //반복 재생
              playlist: "mPaNK28VSoI", //반복 재생으로 재생할 플레이 리스트
            },
          }}
          
        />
      </div>
      {/* <div className="banner-carousel justify-center items-center">
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          selectedItem={currentIndex}
          onChange={handleChange}
          className="w-[400px] lg:hidden"
        >
          {renderSlides}
        </Carousel>
      </div> */}
    </div>
  );
};

export default Banner;
