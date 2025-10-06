// src/pages/Home.tsx
import React from "react";
import type { FC } from "react";
import Spline from "@splinetool/react-spline";
import styles from "./Home.module.scss";
import Particles from "../../styles/animations/Particles";
import AnimatedText from "../../components/shared/AnimatedText";
import AnimatedShinyText from "../../components/shared/AnimatedShinyText";
import AnimatedGradientText from "../../components/shared/AnimatedGradientText";
import Header from "../../layouts/Header";
import GlareHover from "../../styles/animations/GlareHover";
import ScrollDownIcon from "../../assets/icons/scroll-down.svg";
import BrandsSwiper from "../../components/AnimatedSwipers/BrandsSwiper";
import Footer from "../../layouts/Footer";
import MixGallerySwiper from "../../components/AnimatedSwipers/GridGallerySwiper";
import ServicesSwiper from "../../components/AnimatedSwipers/ServicesSwiper";
import LastBlogs from "../../components/Home/LastBlogs";


const Home: FC = () => {
    return (
        <main >
            <div className={styles.homeContainer}>

                <Header />
                <div className={styles.customDesignSpot}></div>
                <div className={styles.customDesignSpotRight}></div>

                <div className={styles.particlesBackground}>
                    <Particles
                        particleColors={["#ffffff", "#ffffff"]}
                    />
                </div>

                <div className={styles.content}>


                    <div className={styles.splineContainer}>

                        <div className={styles.headContentBox}>

                            <AnimatedText text="YS AGENCY!" fontSize="100px" parentClassname="splitTextContainer1" />
                            <div className={styles.customShinyTextWrapper}>
                                <AnimatedShinyText
                                    text="Your professional partner"
                                    className="customShinyText1"
                                />
                            </div>
                        </div>


                        <div className={styles.splineOverlay}>
                            <AnimatedGradientText
                                colors={["#fff", "#00000062"]}
                                className={"customGradientText1"}
                                title={"We’re young, mobile, and social!"}
                            />
                            <img
                                src={ScrollDownIcon}
                                alt="scroll down"
                                className={styles.scrollDownIcon}
                            />
                            {/* <ScrollDownIcon /> */}
                        </div>
                        <Spline scene="https://prod.spline.design/9RqwuXhAEKPpsA0l/scene.splinecode" />

                        <div className={styles.homeFooter}>
                            <AnimatedShinyText text="Deep Within Our Universe"
                                className="customShinyText2"
                                speed={2} />

                            <GlareHover
                                glareColor="#ffffff"
                                width={"190px"}
                                height={"60px"}
                                playOnce={false}
                                className="seeAll"

                            >
                                <p>Hamısına Bax</p>
                            </GlareHover>
                        </div>
                    </div>

                </div>

            </div>

            <MixGallerySwiper />
            <ServicesSwiper />
            <LastBlogs/>
            <div className={styles.homeBodyWrapper}>

                <div className="brandsSwiperContainer" style={{
                    height: "360px",
                    position: "relative",
                    marginBlock: "2rem"
                }}>
                    <BrandsSwiper />
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default Home;
