import styles from "./VideoSessionSliderWrapper.module.scss"
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

const VideoSessionSliderWrapper = () => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    // const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className={styles.videoSessionSliderContainer}>
            <h1>Videosessiya</h1>

            <div className="videoSessionSlider">
                <div className={styles.btnContainer}>
                    <button ref={prevRef} className={styles.prevButton}>⬅</button>
                    <button ref={nextRef} className={styles.nextButton} style={{
                        color: "#fff"
                    }}>➡</button>
                </div>
                <Swiper
                    // onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    loop={true}
                    breakpoints={{
                        0: { // mobile
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        550: { // mobile
                            slidesPerView: 1.5,
                            spaceBetween: 10
                        },
                        700: { // mobile
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        850: { // mobile
                            slidesPerView: 2.5,
                            spaceBetween: 10
                        },
                        1150: { // mobile
                            slidesPerView: 3,
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
                                {/* just delete controls when  */}
                                <video
                                    controls
                                    muted
                                    loop
                                    playsInline
                                    poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg"
                                    style={{ width: '100%', height: "100%", borderRadius: '8px', objectFit: 'cover' }}
                                >
                                    <source
                                        src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
                                        type="video/mp4"
                                    />
                                    Sorry, your browser doesn't support embedded videos, but you can
                                    <a
                                        href="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
                                        download="ed_1024_512kb.mp4"
                                    >
                                        download the MP4
                                    </a>
                                    and watch it.
                                </video>


                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default VideoSessionSliderWrapper
