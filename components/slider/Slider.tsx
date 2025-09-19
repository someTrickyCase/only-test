import React, { useContext, useEffect, useState } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderContext } from "../../providers/slideStateProvider";
import { mockData } from "../../mockData";
import { ScreenWidthContext } from "../../providers/screenWidthProvider";
import "./slider.scss";
import "swiper/css";
import "swiper/css/pagination";

function findSlides(id: number) {
    return mockData.find((el) => el.id === id)?.slides;
}

type SlideType = {
    year: number;
    text: string;
};

export default function Slider() {
    const screenWidth = useContext(ScreenWidthContext);

    const [slides, setSlides] = useState<SlideType[]>();
    const { state } = useContext(SliderContext);

    useEffect(() => {
        setSlides(findSlides(state.value));
    }, [state]);

    if (!screenWidth) return;
    return (
        <Swiper
            key={state.value}
            slidesPerView={screenWidth > 1120 ? 3 : 2}
            centeredSlides={false}
            spaceBetween={60}
            grabCursor={true}
            navigation={screenWidth > 1120}
            pagination={screenWidth <= 1120 ? { clickable: true } : false}
            modules={[Navigation, Pagination]}
            enabled={true}
            watchOverflow={true}
            className='swiper'>
            {slides?.map((slide) => (
                <SwiperSlide>
                    <h3>{slide.year}</h3>
                    <p>{slide.text}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
