import styles from "./ProjectsWrapper.module.scss";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import {
  getAllProjects,
  type ProjectBackResProps,
} from "../../../api/project";
import {
  getCategories,
  type CategoryProps,
} from "../../../api/blog";
import { useTranslation } from "react-i18next";
import LeftArrow from "../../../assets/images/Gallery/leftArrow.png";
import RightArrow from "../../../assets/images/Gallery/rightArrow.png";


const ProjectsWrapper = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [projects, setProjects] = useState<ProjectBackResProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();


  const fetchData = async () => {
    try {
      const resCategories = await getCategories(1, 100);
      setCategories(resCategories.data || []);

      const resProjects = await getAllProjects(
        currentPage,
        10,
        selectedCategory || ""
      );

      setProjects(resProjects.projects || []);
      setTotalPages(resProjects.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, currentPage]);

  useEffect(() => {
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1", 10);
    if (category) setSelectedCategory(category);
    if (!isNaN(page)) setCurrentPage(page);
  }, []);

  useEffect(() => {
    const params: any = {};
    if (selectedCategory) params.category = selectedCategory;
    if (currentPage > 1) params.page = String(currentPage);
    setSearchParams(params);
  }, [selectedCategory, currentPage]);

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth <= 900);
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategory(id === selectedCategory ? null : id);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className={styles.projectsContainer}>
      {/* ✅ Filter Buttons */}
      <div className={styles.filterButtonsSection}>
        <button
          className={`${styles.filterBtn} ${!selectedCategory ? styles.active : ""}`}
          onClick={() => handleCategorySelect(null)}
        >
          {t("all")}
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.active : ""
              }`}
            onClick={() => handleCategorySelect(cat.id)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className={styles.filterMobileSection}>
        <select
          className={styles.filterSelect}
          value={selectedCategory || ""}
          onChange={(e) => handleCategorySelect(e.target.value || null)}
        >
          <option value="">{t("all")}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.projectsWrapper}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className={styles.cardWrapper}
              onClick={() => navigate(`/projects/${project.slug}`)}
            >
              <img src={project.imgUrl} alt={project.title} />
              <div className={styles.smallCardWrapper}>
                <h5>{project.title}</h5>
                <p>{project.headline}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>

      <div className={styles.paginationWrapper}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.pageBtn}
        >
          <img src={LeftArrow} alt="left arrow" />
        </button>
        {/* <span>
          {currentPage} / {totalPages}
        </span> */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.pageBtn}
        >
          <img src={RightArrow} alt="right arrow" />

        </button>
      </div>
    </div>
  );
};

export default ProjectsWrapper;
