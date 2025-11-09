import { useEffect, useState } from 'react';
import styles from "./PhotoSessionSliderDescriptionWrapper.module.scss";
import type { PhotoDescSection } from '../../../api/project';



const PhotoSessionSliderDescriptionWrapper = ({ data }: { data: PhotoDescSection[] }) => {
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
            {data.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                    <div
                        key={index}
                        className={styles.gridItemWrapper}

                    >
                        {isEven && isMobile ? (
                            <>
                                <div className={styles.description}>{item.description}</div>
                                <div className={styles.imageWrapper}>
                                    <div className={styles.blurDesign}></div>
                                    <img src={item.imgUrl} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`${styles.imageWrapper} ${styles.imageLeftWrapper}`}>
                                    <div className={styles.blurDesign}></div>

                                    <img src={item.imgUrl} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
                                </div>
                                <div className={styles.description}>{item.description}</div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default PhotoSessionSliderDescriptionWrapper;
