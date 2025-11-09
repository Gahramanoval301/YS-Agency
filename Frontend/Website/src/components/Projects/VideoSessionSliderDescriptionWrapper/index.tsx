import { useEffect, useState } from 'react';
import styles from "./VideoSessionSliderDescriptionWrapper.module.scss";
import type { VideoDescSection } from '../../../api/project';
import YouTubeEmbed from '../../shared/YoutubeEmbed';


const VideoSessionSliderDescriptionWrapper = ({ data }: { data: VideoDescSection[] }) => {
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
            <h1>Videosessiya</h1>
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
                                <div className={styles.videoWrapper}>
                                    <div className={styles.blurDesign}></div>
                                    <div className="video-wrapper">
                                        <YouTubeEmbed thumbnailUrl={item.imgUrl} youtubeLink={item.youtubeLink} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`${styles.videoWrapper} ${styles.videoLeftWrapper}`}>
                                    <div className={styles.blurDesign}></div>

                                    <YouTubeEmbed thumbnailUrl={item.imgUrl} youtubeLink={item.youtubeLink} />
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

export default VideoSessionSliderDescriptionWrapper;
