// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import Gallery3 from "../../../assets/images/Gallery/gallery3.png";
import Gallery4 from "../../../assets/images/Gallery/gallery4.png";
import Gallery5 from "../../../assets/images/Gallery/gallery5.png";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';
import { useTranslation } from 'react-i18next';


export default function ServicesSwiper() {
    const { t } = useTranslation();


    const SERVICES_DATA_FOR_HOME = [
        {
            imgUrl: Gallery1,
            type: t("branding")
        },
        {
            imgUrl: Gallery2,
            type: t("graphicdesign")
        },
        {
            imgUrl: Gallery3,
            type: t("makretingstrategy")
        },
        {
            imgUrl: Gallery4,
            type: t("socialmediamarketing")
        },
        {
            imgUrl: Gallery5,
            type: t("copywriting")
        },
    ];

    return (
        <div className='ServicesSwiperContainer'>
            <Swiper
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    540: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    800: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1140: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {
                    SERVICES_DATA_FOR_HOME.map((service, index) => (
                        <>
                            <SwiperSlide
                                key={index}
                                className={index % 2 === 0 ? "slide-even" : "slide-odd"}
                            >
                                <img src={service.imgUrl} alt="" />
                                <div className='headlineBox'>

                                    <div className="headline">
                                        <span className="number">{`0${index + 1}`}</span>
                                    </div>
                                    <span className="type">{service.type}</span>
                                </div>
                            </SwiperSlide>
                        </>
                    ))
                }


            </Swiper>
        </div>
    );
}
