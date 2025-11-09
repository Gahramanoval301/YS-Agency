import Header from "../../../layouts/Header"
import LightRays from "../../../styles/animations/LightRays"
import styles from "./ProjectDetailsWrapper.module.scss"
import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import Footer from "../../../layouts/Footer";
import SocialMarketingWrapper from "../../Projects/SocialMarketingWrapper";
import PhotoSessionSliderWrapper from "../../Projects/PhotoSessionSliderWrapper";
import VideoSessionSliderWrapper from "../../Projects/VideoSessionSliderWrapper";
import VideoSessionSliderDescriptionWrapper from "../../Projects/VideoSessionSliderDescriptionWrapper";
import type { ProjectBackResProps } from "../../../api/project";
import { useTranslation } from "react-i18next";

const ProjectDetailsWrapper = ({ projectData }: { projectData: ProjectBackResProps }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.projectsDetailsContainer}>
            <div className={styles.effectWrapper}>

                <LightRays
                    raysOrigin="top-center"
                    raysColor="#FF50FC"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className={styles.customRays}
                />
            </div>

            <div className={styles.bodyContent}>
                <Header />
                <div className={styles.contentWrapper}>
                    <div className={styles.projectSingleNav}>
                        <p>{t("ourprojects")}</p>
                        <span>&gt;</span>
                        <p className={styles.projectTitle}>{projectData.title}</p>
                    </div>
                    <div className={styles.singleProjectBanner}>
                        <div className={styles.leftDesign}>
                            <img src={projectData.sectionImages[0].imgUrl} alt="left-design" />
                        </div>
                        <div className={styles.rightDesign}>
                            <img src={projectData.sectionImages[1].imgUrl} alt="right-design" />
                        </div>

                        <div className={styles.projectContentWrapper}>
                            <div className={styles.iconWrapper}>
                                <img src={projectData.imgUrl} alt={`${projectData.title}`} style={{
                                    width: "100%", height: "100%"
                                }} />
                            </div>

                            <button>
                                {projectData.title}
                            </button>

                        </div>

                    </div>
                    <div className={styles.leftDesignMobile}>
                        <img src={Gallery1} alt="left-design" />
                    </div>

                    <div className={styles.introductionContent}>
                        <p style={{ whiteSpace: "pre-line" }}>{projectData.content}</p>
                    </div>
                    <div className={styles.rightDesignMobile}>
                        <img src={Gallery2} alt="right-design" />
                    </div>
                    <SocialMarketingWrapper data={projectData.photoDescSections} />
                    <PhotoSessionSliderWrapper data={projectData.photoGallerySections} />
                    <VideoSessionSliderDescriptionWrapper data={projectData.videoDescSections} />
                    {/* <PhotoSessionSliderDescriptionWrapper data={projectData.photoDescSections} /> */}
                    <VideoSessionSliderWrapper data={projectData.videoGallerySections} />
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default ProjectDetailsWrapper
