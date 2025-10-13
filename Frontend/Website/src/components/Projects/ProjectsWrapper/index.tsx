import styles from "./ProjectsWrapper.module.scss"
import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import Gallery3 from "../../../assets/images/Gallery/gallery3.png";
import Gallery4 from "../../../assets/images/Gallery/gallery4.png";
import Gallery5 from "../../../assets/images/Gallery/gallery5.png";
import Gallery6 from "../../../assets/images/Gallery/gallery6.png";
import { useNavigate } from 'react-router';

const FILTER_OPTION_BTNS = [
    {
        title: "Hamısı",
        value: "all"
    },
    {
        title: "Brand",
        value: "brand"
    },
    {
        title: "Marketing",
        value: "marketing"
    },
    {
        title: "Rəqəmsal marketing",
        value: "digitalMarketing"
    },
]

export const PROJECTS_DATA = [
    {
        id:0,
        projectImgUrl: Gallery1,
        title: "«Qarabağ Steel» üçün Brendinq",
        description: "Metallurgiyada Yeni Standart Yaradırıq"
    },
    {
        id:1,
        projectImgUrl: Gallery2,
        title: "Forte Fashion & Kids",
        description: "Marketing strategy & SMM"
    },
    {
        id:2,
        projectImgUrl: Gallery3,
        title: "DAHUA",
        description: "Marketing strategy & SMM"
    },
    {
        id:3,
        projectImgUrl: Gallery4,
        title: "Aston Martin",
        description: "Formula 1 Azərbaycanda"
    },
    {
        id:4,
        projectImgUrl: Gallery5,
        title: "Avtolüks Azərbaycan MMC",
        description: "Marketing strategy & SMM"
    },
    {
        id:5,
        projectImgUrl: Gallery6,
        title: "LG",
        description: "Marketing strategy & SMM"
    },
]
const ProjectsWrapper = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.projectsContainer}>
            <div className={styles.filterButtonsSection}>
                {FILTER_OPTION_BTNS.map(filterBtn => (
                    <button className={styles.filterBtn} key={filterBtn.value}>
                        {filterBtn.title}
                    </button>
                ))}
            </div>

            <div className={styles.filterMobileSection}>
                <select className={styles.filterSelect}>
                    {FILTER_OPTION_BTNS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.projectsWrapper}>
                {
                    PROJECTS_DATA.map(project => (
                        <div className={styles.cardWrapper} onClick={()=>(navigate(`/projects/${project.id}`))}>
                            <img src={project.projectImgUrl} />
                            <div className={styles.smallCardWrapper}>
                                <h5>{project.title}:</h5>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    ))
                }

            </div>


            <div className={styles.paginationWrapper}>
                <span>left</span>
                <span>right</span>
            </div>
        </div>
    )
}

export default ProjectsWrapper
