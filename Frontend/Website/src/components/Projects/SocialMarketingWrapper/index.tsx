import styles from "./SocialMarketingWrapper.module.scss"
// import { useRef } from 'react';

// import Gallery1 from "../../../assets/images/Gallery/gallery1.png";

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/navigation';


// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

import './index.css';

// import required modules
// import { Navigation } from 'swiper/modules';
import type { PhotoDescSection } from "../../../api/project";

const SocialMarketingWrapper = ({ data }: { data: PhotoDescSection[] }) => {

  // const prevRef = useRef<HTMLButtonElement>(null);
  // const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={styles.customSwiperWrapper}>
      <div className={styles.socialMarketingContainer}>
        <div className="socialMarketingSwiper">
          <div

          >
            {/* <div className={styles.btnContainer}>
              <button ref={prevRef} className={styles.prevButton}>⬅</button>
              <button ref={nextRef} className={styles.nextButton} style={{
                color: "#fff"
              }}>➡</button>
            </div> */}

            <div className={styles.gridContainer}>
              <div className={styles.contentWrapper}>
                {/* <h5>
                 {data[0].title}
                </h5> */}
                <div className={styles.titleWrapper}>
                  <span>01</span>
                  <h3>
                    {data[0].title}
                  </h3>
                </div>
                <p style={{ whiteSpace: "pre-line" }}>{data[0].description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, perspiciatis?</p>

              </div>
              <div className={styles.imageWrapper}>
                <img src={data[0].imgUrl} alt="image" />

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialMarketingWrapper
