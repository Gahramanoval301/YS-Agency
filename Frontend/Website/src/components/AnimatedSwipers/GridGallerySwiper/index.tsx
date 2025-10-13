import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import Gallery3 from "../../../assets/images/Gallery/gallery3.png";
import Gallery4 from "../../../assets/images/Gallery/gallery4.png";
import Gallery5 from "../../../assets/images/Gallery/gallery5.png";
import Gallery6 from "../../../assets/images/Gallery/gallery6.png";
import Gallery7 from "../../../assets/images/Gallery/gallery7.png";
import Gallery8 from "../../../assets/images/Gallery/gallery8.png";


// ✅ Import necessary CSS files
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./index.css"
import styles from "./MixGallerySwiper.module.scss"

const GALLERY_DATA = [
  Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery6, Gallery7, Gallery8, Gallery2, Gallery3, Gallery4, Gallery5, Gallery1, Gallery2, Gallery3, Gallery7, Gallery8,
]
const MixGallerySwiper = () => {
  return (
    <div className="gridGallerySwiperContainer">

      <Swiper
        modules={[Grid, Pagination]}
        grid={{
          rows: 2,
          fill: "row",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {GALLERY_DATA.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <div className={styles.imageWrapper}>
              <img src={imgUrl} alt="gallery image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MixGallerySwiper;
