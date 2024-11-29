import { Swiper, SwiperSlide } from "swiper/react";
import style from "../Slider/Slider.module.scss"

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";

export const Slider = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
           <div className={style.slider_card}>
            <img src="src/assets/mainPage/watchSlider.png" />
            <p>Высокая и оперативная скорость обработки заявки</p>
           </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.slider_card}>
            <img src="src/assets/mainPage/loupeSlider.png" />
            <p>
              Огромная комплексная база данных, обеспечивающая объективный ответ
              на запрос
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.slider_card}>
            <img src="src/assets/mainPage/shieldSlider.png" />
            <p>
              Защита конфеденциальных сведений, не подлежащих разглашению по
              федеральному законодательству
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        {/* <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>  */}
      </Swiper>
    </>
  );
};
