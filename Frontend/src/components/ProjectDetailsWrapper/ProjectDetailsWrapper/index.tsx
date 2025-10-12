import Header from "../../../layouts/Header"
import type { Project } from "../../../pages/ProjectDetails"
import LightRays from "../../../styles/animations/LightRays"
import styles from "./ProjectDetailsWrapper.module.scss"
import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import Gallery3 from "../../../assets/images/Gallery/gallery3.png";
import Gallery4 from "../../../assets/images/Gallery/gallery4.png";
import Gallery5 from "../../../assets/images/Gallery/gallery5.png";
import Gallery6 from "../../../assets/images/Gallery/gallery6.png";
import Gallery7 from "../../../assets/images/Gallery/gallery7.png";
import Gallery8 from "../../../assets/images/Gallery/gallery8.png";
import Footer from "../../../layouts/Footer";
import SocialMarketingWrapper from "../../Projects/SocialMarketingWrapper";
import PhotoSessionSliderWrapper from "../../Projects/PhotoSessionSliderWrapper";
import VideoSessionSliderWrapper from "../../Projects/VideoSessionSliderWrapper";
import VideoSessionSliderDescriptionWrapper from "../../Projects/VideoSessionSliderDescriptionWrapper";
import PhotoSessionSliderDescriptionWrapper from "../../Projects/PhotoSessionSliderDescriptionWrapper";

const ProjectDetailsWrapper = ({ projectData }: { projectData: Project }) => {
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
                        <p>Layihelerimiz</p>
                        <span>&gt;</span>
                        <p className={styles.projectTitle}>{projectData.title}</p>
                    </div>
                    <div className={styles.singleProjectBanner}>
                        <div className={styles.leftDesign}>
                            <img src={Gallery1} alt="left-design" />
                        </div>
                        <div className={styles.rightDesign}>
                            <img src={Gallery2} alt="right-design" />
                        </div>

                        <div className={styles.projectContentWrapper}>
                            <div className={styles.iconWrapper}>
                                <span>icon</span>
                            </div>

                            <button>
                                {projectData.title} AZERBAYCAN
                            </button>

                        </div>

                    </div>
                    <div className={styles.leftDesignMobile}>
                        <img src={Gallery1} alt="left-design" />
                    </div>

                    <div className={styles.introductionContent}>
                        <p>Avtolüks Azərbaycan MMC, Azərbaycanda avtomobil xidmətləri bazarının lideridir. Biz rəqəmsal marketinq sahəsində bir sıra uğurlu layihələr həyata keçirmişik. Sosial media idarəetmə layihəmiz, hər bir avtomobil modelinin unikal xüsusiyyətlərini vurğulamaq və birbaşa müştərilərimizlə yaxın əlaqəni dəstəkləmək məqsədini güdür.
                            Sosial media səhifələri, sürət, üslub və rahatlıq dünyasına tam şəkildə dalmaq üçün mükəmməl yerdir.Biz auditoriyamıza maksimal təsir göstərmək və biznes məqsədlərinə çatmaq üçün mövcud olan bütün vasitələrdən və imkanlardan istifadə edirik, bunlar arasında:</p>
                    </div>
                    <div className={styles.rightDesignMobile}>
                        <img src={Gallery2} alt="right-design" />
                    </div>
                    <SocialMarketingWrapper />
                    <PhotoSessionSliderWrapper />
                    <VideoSessionSliderDescriptionWrapper />
                    <PhotoSessionSliderDescriptionWrapper />
                    <VideoSessionSliderWrapper />
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default ProjectDetailsWrapper
