import React, { useEffect } from 'react'
import styles from "./HeroSection.module.scss"
import Particles from '../../styles/animations/Particles'
import LightRays from '../../styles/animations/LightRays'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import CircularText from '../../styles/animations/CircularText'
import BrandsSwiper from '../../components/AnimatedSwipers/BrandsSwiper'
import AgencyIntro from '../../components/About/AgencyIntro'

const MainLayout = ({ title, showHeader = true, showFooter = true, showBrands = true, children }) => {
    const [isMounted, setIsMounted] = React.useState(false);
    useEffect(() => { setIsMounted(true); }, []);


    return (
        <div className={styles.heroIndexBanner}>
            <div className={styles.effectWrapper}>
                {isMounted && (
                    <>
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
                        <Particles
                            particleColors={["#ffffff", "#ffffff"]}
                            className={styles.particlesCanvas}
                        />
                    </>
                )}
            </div>

            <div className={styles.bodyContent}>
                {showHeader && <Header />}
                <div className={styles.mainSection}>
                    <div className={styles.titleContainer}>
                        <div className={styles.titleWrapper}>
                            <h1>
                                {title}
                            </h1>
                        </div>
                        <div className={styles.circularTextWrapper}>

                            <CircularText
                                text="YS*AGENCY*YS*AGENCY*"
                                spinDuration={20}
                            />
                        </div>
                    </div>

                    <div className={styles.customDivider}></div>
                    {children}
                    {showBrands && <BrandsSwiper />}
                </div>
                {showFooter && <Footer />}
            </div>
        </div>

    )
}

export default MainLayout
