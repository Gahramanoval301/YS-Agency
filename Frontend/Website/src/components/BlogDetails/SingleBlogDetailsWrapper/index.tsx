import styles from "./SingleBlogDetailsWrapper.module.scss"
import Particles from '../../../styles/animations/Particles'
import LightRays from '../../../styles/animations/LightRays'
import Header from '../../../layouts/Header'
import BlogSingleContentWrapper from '../BlogSingleContentWrapper'
import Footer from '../../../layouts/Footer'
import SimilarBlogs from '../SimilarBlogs'
const SingleBlogDetailsWrapper = ({ data }) => {

    return (
        <div className={styles.singleBlogDetailsWrapperContainer}>
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
                <Particles
                    particleColors={["#ffffff", "#ffffff"]}
                    className={styles.particlesCanvas}
                />


            </div>

            <div className={styles.bodyContent}>
                <Header />
                <div className={styles.contentWrapper}>

                    <div className={styles.navContainer}>
                        <a href='/'>
                            Ana sehife
                        </a>
                        <i>&gt;</i>
                        <a href="">
                            {data.title}
                        </a>
                    </div>

                    <div className={styles.blogDesign}>BLOG</div>

                    <BlogSingleContentWrapper data={data} />
                <SimilarBlogs/>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default SingleBlogDetailsWrapper
