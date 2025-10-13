import  { useEffect, useState } from 'react';
import styles from "./PhotoSessionSliderDescriptionWrapper.module.scss";

const VIDEO_DESCRIPTION_DATA = [
    {
        imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg",
        imageDescription: "Cubarbakudan barmen @tural.hasanov.13 “Banketnaya Yubiley ilə Yeni il kokteylləri” layihəsində “Before the snow” kokteylini hazırlamışdı."
    },
    {
        imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg",
        imageDescription: "2Cubarbakudan barmen @tural.hasanov.13 “Banketnaya Yubiley ilə Yeni il kokteylləri” layihəsində “Before the snow” kokteylini hazırlamışdı."
    },
    {
        imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg",
        imageDescription: "3Cubarbakudan barmen @tural.hasanov.13 “Banketnaya Yubiley ilə Yeni il kokteylləri” layihəsində “Before the snow” kokteylini hazırlamışdı."
    },
    {
        imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg",
        imageDescription: "4Cubarbakudan barmen @tural.hasanov.13 “Banketnaya Yubiley ilə Yeni il kokteylləri” layihəsində “Before the snow” kokteylini hazırlamışdı."
    },
];

const PhotoSessionSliderDescriptionWrapper = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 830px)");
        setIsMobile(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <div className={styles.videoSliderDescContainer}>
            <h1>Fotosessiya</h1>
            {VIDEO_DESCRIPTION_DATA.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                    <div
                        key={index}
                        className={styles.gridItemWrapper}

                    >
                        {isEven && isMobile ? (
                            <>
                                <div className={styles.description}>{item.imageDescription}</div>
                                <div className={styles.imageWrapper}>
                                    <div className={styles.blurDesign}></div>
                                    <img src={item.imageSrc} alt="image" style={{ width: '100%', borderRadius: '8px' }} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`${styles.imageWrapper} ${styles.imageLeftWrapper}`}>
                                    <div className={styles.blurDesign}></div>

                                    <img src={item.imageSrc} alt="image" style={{ width: '100%', borderRadius: '8px' }} />
                                </div>
                                <div className={styles.description}>{item.imageDescription}</div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default PhotoSessionSliderDescriptionWrapper;
