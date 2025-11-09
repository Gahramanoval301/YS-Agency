import styles from "./MotivationIntro.module.scss";
import GlareHover from '../../../styles/animations/GlareHover';
import type { AboutFormValues } from "../../../api/about";
import HtmlParser from "../../shared/HtmlParser";

const MotivationIntro = ({ data }: { data: AboutFormValues }) => {

    return (
        <div className={styles.motivationIntroContainer}>
            <div className={styles.motivationIntroWrapper}>
                <GlareHover
                    glareColor="#ffffff"
                    playOnce={false}
                    className="motivationTagline"
                >
                    <h5>{data.texts[1].headline}</h5>
                </GlareHover>

                {/* className={styles.textContent} */}
                <div >
                    <HtmlParser data={data.texts[1].content} />
                </div >

            </div>

            <div className={styles.imageContainer}>
                {/* image */}
                {
                    data.imageUrl &&
                    <img src={data.imageUrl} alt="data" />
                }
            </div>
        </div>
    );
};

export default MotivationIntro;
