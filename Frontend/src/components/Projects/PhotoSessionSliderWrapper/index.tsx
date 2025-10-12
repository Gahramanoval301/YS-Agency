import styles from "./PhotoSessionSliderWrapper.module.scss"
import React, { useRef } from 'react';

import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router';

const PhotoSessionSliderWrapper = () => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    return (
        <div className={styles.customPhotoSwiperWrapper}>
            <h1>Fotosessiya</h1>
            <div className="photoGallerySwiper">
                <div className={styles.btnContainer}>
                    <button ref={prevRef} className={styles.prevButton}>⬅</button>
                    <button ref={nextRef} className={styles.nextButton} style={{
                        color: "#fff"
                    }}>➡</button>
                </div>
                <Swiper

                    loop={true}
                    breakpoints={{
                        0:{
                                slidesPerView:1,
                                spaceBetween:10,
                        },
                        580:{
                                slidesPerView:3,
                                spaceBetween:10,
                        },
                        640:{
                                slidesPerView:3.5,
                                spaceBetween:10,
                        },
                        850: { // mobile
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                    }}
                    modules={[Navigation]}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current
                    }}
                    onBeforeInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    className="mySwiper"
                >

                    {[...Array(5)].map((num) => (

                        <SwiperSlide key={num}>
                            <div className="imageWrapper">

                                <img src={Gallery1} alt="gallery" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default PhotoSessionSliderWrapper
