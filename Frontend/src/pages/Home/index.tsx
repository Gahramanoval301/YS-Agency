// src/pages/Home.tsx
import React from "react";
import type { FC } from "react";
import Spline from "@splinetool/react-spline";
import styles from "./Home.module.scss";
import Particles from "../../styles/animations/Particles";
import SplitText from "../../styles/animations/SplitText";
import AnimatedText from "../../components/shared/AnimatedText";
import ShinyText from "../../styles/animations/ShinyText";
import AnimatedShinyText from "../../components/shared/AnimatedShinyText";
import GradientText from "../../styles/animations/GradientText";
import AnimatedGradientText from "../../components/shared/AnimatedGradientText";
import Aurora from "../../styles/animations/AuroraBg";
import Header from "../../layouts/Header";
import GlareHover from "../../styles/animations/GlareHover";
import ScrollDownIcon from "../../assets/icons/scroll-down.svg";
import BrandsSwiper from "../../components/AnimatedSwipers/BrandsSwiper";
import Footer from "../../layouts/Footer";




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
                        particleCount={200}

                        particleSpread={10}
                        speed={0.1}
                        particleBaseSize={100}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
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

            <div className={styles.homeBodyWrapper}>

                <div style={{
                    height: "360px",
                    position: "relative",
                    marginBlock:"2rem"
                }}>
                    <BrandsSwiper />
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default Home;
