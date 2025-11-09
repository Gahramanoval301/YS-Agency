import styles from "./Studio.module.scss"
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import CircularText from '../../styles/animations/CircularText'
import { useEffect, useState } from "react"
import { getStudioData, type StudioBackResProps } from "../../api/studio"
import HtmlParser from "../../components/shared/HtmlParser"
import { useTranslation } from "react-i18next"
import StudioBackground from "../../assets/images/Gallery/studioBackground.png";

const Studio = () => {
    const { t } = useTranslation();
    const [studioData, setStudioData] = useState<StudioBackResProps | null>(null);

    const fetchStudiioData = async () => {
        const resStudio = await getStudioData();
        setStudioData(resStudio.data);
    }

    useEffect(() => {
        fetchStudiioData();
    }, [])

    return (
        <div className={styles.studioContainer}>
            <div className={styles.studioWrapper}>
                <Header />
            </div>
            <div className={styles.studioContentWrapper}>
                <div className={styles.titleContainer}>
                    <div className={styles.titleWrapper}>
                        <h1>
                            {t("studio")}
                        </h1>
                    </div>
                    <div className={styles.circularTextWrapper}>

                        <CircularText
                            text="YS*AGENCY*YS*AGENCY*"
                            spinDuration={20}
                        />
                    </div>
                </div>

                <div className={styles.contentWrapper}>

                    {studioData?.content &&
                        <>
                            <HtmlParser data={studioData?.content} />
                        </>
                    }
                </div>
                <div>

                    <div className={styles.studioBackWrapper}>
                        <img src={StudioBackground} alt="Studio Background" />
                    </div>
                </div>
                <div className={styles.imageSection}>
                    <div className={`${styles.imgWrapper}`}>
                        <img src={studioData?.images[0].imgUrl} alt={`${studioData?.headline}-${studioData?.images[0].imgFileId} `} />
                    </div>
                    <div className={styles.secondLineImgWrapper}>
                        <div className={`${styles.imgWrapper}`}>
                            <img src={studioData?.images[1].imgUrl} alt={`${studioData?.headline}-${studioData?.images[1].imgFileId} `} />
                        </div>
                        <div className={`${styles.imgWrapper}`}>
                            <img src={studioData?.images[2].imgUrl} alt={`${studioData?.headline}-${studioData?.images[2].imgFileId} `} />
                        </div>
                        <div className={`${styles.imgWrapper}`}>
                            <img src={studioData?.images[3].imgUrl} alt={`${studioData?.headline}-${studioData?.images[3].imgFileId} `} />
                        </div>
                    </div>
                    <div className={`${styles.imgWrapper}`}>
                        <img src={studioData?.images[4].imgUrl} alt={`${studioData?.headline}-${studioData?.images[4].imgFileId} `} />
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Studio
