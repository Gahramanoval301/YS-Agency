import { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import CircleDesign from "../../../assets/images/Gallery/circleDesign.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';
import styles from './BrandsSwiper.module.scss';

// import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router';
import { getPartners, type PartnerProps } from '../../../api/partner';
import { useTranslation } from 'react-i18next';

import LeftArrow from "../../../assets/images/Gallery/leftArrow.png";
import RightArrow from "../../../assets/images/Gallery/rightArrow.png";

export default function BrandsSwiper() {
    const { t } = useTranslation();
    const [partners, setPartners] = useState<PartnerProps[] | null>(null);


    const fetchPartners = async () => {
        const resData = await getPartners();
        setPartners(resData.data);
    }

    useEffect(() => {
        fetchPartners();
    }, [])

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            {partners && partners?.length > 0 &&
                < div className={styles.brandsSwiperWrapper}>
                    <Link to={"/"}>{t("seall")}</Link>
                    <div className={styles.btnContainer}>
                        <button ref={prevRef} className={styles.prevButton}>
                            <img src={LeftArrow} alt="left arrow" />

                        </button>
                        <button ref={nextRef} className={styles.nextButton} style={{
                            color: "#fff"
                        }}>
                            <img src={RightArrow} alt="right arrow" />
                        </button>
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
                        {partners && partners.map((partner, index) => {
                            const rotationAngle = index * 90;

                            return (
                                <SwiperSlide key={partner.id}>
                                    <div
                                        className={styles.slideWrapper}
                                        style={{
                                            transform: `rotate(${rotationAngle}deg)`
                                        }}
                                    >
                                        <img
                                            src={CircleDesign}
                                            alt="circle-design"
                                            className={styles.circleDesignWrapper}
                                        />
                                        <div className={styles.partnerImgWrapper}>
                                            <img
                                                src={partner.imgUrl}
                                                alt={`${partner.id}-${partner.imgUrl}`}
                                                style={{ transform: `rotate(-${rotationAngle}deg)` }}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}

                    </Swiper>
                </ div>}
        </>
    );

}
