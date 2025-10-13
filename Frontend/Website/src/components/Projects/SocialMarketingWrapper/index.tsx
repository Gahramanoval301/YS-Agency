import styles from "./SocialMarketingWrapper.module.scss"
import { useRef } from 'react';

import Gallery1 from "../../../assets/images/Gallery/gallery1.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

// import required modules
import { Navigation } from 'swiper/modules';

const SocialMarketingWrapper = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={styles.customSwiperWrapper}>
      <div className={styles.socialMarketingContainer}>
        <div className="socialMarketingSwiper">
          <Swiper
            loop={true}
            breakpoints={{
              320: { // mobile
                slidesPerView: 1,
                spaceBetween: 100
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
            <div className={styles.btnContainer}>
              <button ref={prevRef} className={styles.prevButton}>⬅</button>
              <button ref={nextRef} className={styles.nextButton} style={{
                color: "#fff"
              }}>➡</button>
            </div>
            {[...Array(5)].map((num) => (

              <SwiperSlide key={num}>
                <div className={styles.gridContainer}>
                  <div className={styles.contentWrapper}>
                    <h5>
                      Social Media Marketing
                    </h5>
                    <div className={styles.titleWrapper}>
                      <span>01</span>
                      <h3>Jeep Azerbaycan</h3>

                    </div>

                  </div>
                  <div className={styles.imageWrapper}>
                    <img src={Gallery1} alt="image" />

                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default SocialMarketingWrapper
