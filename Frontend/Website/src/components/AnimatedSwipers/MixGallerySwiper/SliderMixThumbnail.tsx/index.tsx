import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./index.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { ProjectItem } from "../../../../api/project";
import { getSmallProjects } from "../../../../api/project";
import HtmlParser from "../../../shared/HtmlParser";

export default function SliderMixThumbnail() {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const mainSwiperRef = useRef<any>(null);
    const pageLimit = 8;

    const fetchProjects = async (page: number) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const resData = await getSmallProjects(page, pageLimit);
            if (resData?.projects) {
                setProjects((prev) => [...prev, ...resData.projects]);
                setTotalPages(resData.pagination.totalPages);
            }
        } catch (err) {
            console.error("Failed to fetch projects:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReachEnd = () => {
        if (currentPage < (totalPages || 0)) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchProjects(nextPage);
        }
    };

    useEffect(() => {
        fetchProjects(1);
    }, []);

    if (projects.length === 0 && isLoading) {
        return <>Loading...</>;
    }

    return (
        <div className="sliderMixThumbnailProject">
            <Swiper
                onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                onReachEnd={handleReachEnd}
                style={{
                    ["--swiper-navigation-color" as any]: "#ff0000",
                    ["--swiper-pagination-color" as any]: "#ff0000",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {projects.map(({ content, id, imgUrl, title }) => (
                    <SwiperSlide key={id}>
                        <div className="swiper-description">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="max-8-line-text">
                                <HtmlParser data={content} />
                            </p>
                        </div>
                        <img src={imgUrl} />
                    </SwiperSlide>
                ))}
            </Swiper>


            <Swiper
                onSwiper={setThumbsSwiper}
                slidesPerView={5}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    600: { slidesPerView: 3 },
                    860: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                }}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {projects.map(({ id, imgUrl }) => (
                    <SwiperSlide key={id}>
                        <img src={imgUrl} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {isLoading && (
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    Loading more...
                </p>
            )}
        </div>
    );
}
