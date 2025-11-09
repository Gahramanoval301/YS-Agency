import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./index.css"
import styles from "./MixGallerySwiper.module.scss"
import { useEffect, useRef, useState } from "react";
import SliderMixThumbnail from "./SliderMixThumbnail.tsx";
import { getSmallProjects, type ProjectItem } from "../../../api/project.ts";
import { useTranslation } from "react-i18next";


const MixGallerySwiper = () => {
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");
  const [projectsData, setProjectsData] = useState<ProjectItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const swiperRef = useRef<any>(null);
  const pageLimit = 8;

  const handleViewChange = (mode: "grid" | "slider") => {
    setViewMode(mode);
  };

  const fetchSmallProjectsData = async (page: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const resData = await getSmallProjects(page, pageLimit);
      if (resData?.projects) {
        setProjectsData((prev) => [...prev, ...resData.projects]);
        setTotalPages(resData.pagination.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setIsLoading(false);
    }

  }

  const handleReachEnd = () => {
    if (currentPage < (totalPages || 0)) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchSmallProjectsData(nextPage);
    }
  };


  useEffect(() => {
    fetchSmallProjectsData(1);
  }, [])

  console.log(projectsData);

  if (!projectsData) {
    return <>{t("loading")}...</>
  }

  return (
    <div className="gridGallerySwiperContainer">
      <div className="swiperChangeBtnWrapper">
        <button
          className={viewMode === "grid" ? "active" : ""}
          onClick={() => handleViewChange("grid")}
        >
          {t("grid")}
        </button>
        <button
          className={viewMode === "slider" ? "active" : ""}
          onClick={() => handleViewChange("slider")}
        >
          {t("slider")}
        </button>
      </div>

      {viewMode === "grid" ? <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachEnd={handleReachEnd}
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
        spaceBetween={10}
      >
        {projectsData.map(({ id, imgUrl }) => (
          <SwiperSlide key={id}>
            <div className={styles.imageWrapper}>
              <img src={imgUrl} alt="gallery image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper> : <SliderMixThumbnail />}
      {isLoading && <p style={{ textAlign: "center", marginTop: "1rem" }}>{("loading")}...</p>}

    </div>
  );
};

export default MixGallerySwiper;
