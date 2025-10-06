import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';
import styles from './BrandsSwiper.module.scss';

// import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router';

const BRANDS = [
    {
        title: "Ferrari",
        imgUrl: ""
    }, {
        title: "Jeep",
        imgUrl: "",
        rotate: "45deg"
    }, {
        title: "Autolux",
        imgUrl: "",
        rotate: "90deg"
    },
    {
        title: "Autolux",
        imgUrl: "",
        rotate: "130deg"
    },
    {
        title: "Autolux",
        imgUrl: "",
        rotate: "45deg"
    },
    {
        title: "Autolux",
        imgUrl: "",
        rotate: "90deg"

    },
    {
        title: "Autolux",
        imgUrl: "",
        rotate: "135deg"

    },
]

export default function BrandsSwiper() {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <div className={styles.brandsSwiperWrapper}>
            <Link to={"/"}>See all</Link>
            <div className={styles.btnContainer}>
                <button ref={prevRef} className={styles.prevButton}>LEFT</button>
                <button ref={nextRef} className={styles.nextButton} style={{
                    color: "#fff"
                }}>RIGHT</button>
            </div>
            <Swiper
                loop={true}
                breakpoints={{
                    320: { // mobile
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    576: { // small tablets
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    880: { // tablets
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1200: { // laptops
                        slidesPerView: 4,
                        spaceBetween: 20
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
                {BRANDS.map((brand) => (
                    <SwiperSlide key={brand.title}>
                        <div
                            className={styles.slideWrapper}
                            style={{ '--rotate-angle': brand.rotate } as React.CSSProperties}
                        >
                            <div className={styles.rotatingDots}>
                                <div className={styles.dotLeft}></div>
                                <div className={styles.dotRight}></div>
                            </div>
                            <p>{brand.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );

}
