import styles from "./AgencyIntro.module.scss";
import GlareHover from '../../../styles/animations/GlareHover';
import type { AboutFormValues } from "../../../api/about";
import HtmlParser from "../../shared/HtmlParser";
import { useTranslation } from "react-i18next";

const AgencyIntro = ({ data }: { data: AboutFormValues }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.introWrapper}>
                <h2>{t("yourprofessionalpartner")}</h2>
                <p>{t("anextgenerationbrandingmarketinganddigitalservicesagency")}</p>
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
