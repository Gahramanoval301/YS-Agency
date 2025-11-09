import styles from "./PhotoSessionSliderWrapper.module.scss"
import { useRef } from 'react';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

// import required modules
import { Navigation } from 'swiper/modules';
import type { PhotoGallerySection } from "../../../api/project";

const PhotoSessionSliderWrapper = ({ data }: { data: PhotoGallerySection[] }) => {
    console.log(data);

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
                    loop={data.length > 5 ? true : false}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        580: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 3.5,
                            spaceBetween: 10,
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

                    {data.map((gallery) => (

                        <SwiperSlide key={gallery.imgFileId}>
                            <div className={styles.imageWrapper}>

                                <img src={gallery.imgUrl} alt={`${gallery.title}`} />
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    )
}

export default PhotoSessionSliderWrapper
