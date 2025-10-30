import styles from "./AgencyIntro.module.scss";
import GlareHover from '../../../styles/animations/GlareHover';
import type { AboutFormValues } from "../../../api/about";
import HtmlParser from "../../shared/HtmlParser";

const AgencyIntro = ({ data }: { data: AboutFormValues }) => {
    return (
        <div className={styles.sectionContainer}>
            <div className={styles.introWrapper}>
                <h2>Sizin Peşəkar Tərəfdaşınız!</h2>
                <p>Yeni nəsil brendinq, marketinq və rəqəmsal xidmətlər agentliyi.</p>
                {/* image */}
            </div>
            <div className={styles.infoWrapper}>
                <GlareHover
                    glareColor="#ffffff"
                    playOnce={false}
                    className="agencyTagline"
                >
                    <h5>{data.texts[0].headline}</h5>
                </GlareHover>

                <HtmlParser data={data.texts[0].content} />

            </div>
        </div>
    );
};

export default AgencyIntro;
