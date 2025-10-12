import React, { useEffect, useState } from 'react';
import styles from "./VideoSessionSliderDescriptionWrapper.module.scss";

const VIDEO_DESCRIPTION_DATA = [
    {
        videoSrc: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
        videoDescription: "Cubarbakudan barmen @tural.hasanov.13 “Banketnaya Yubiley ilə Yeni il kokteylləri” layihəsində “Before the snow” kokteylini hazırlamışdı."
    },
    {
        videoSrc: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
        videoDescription: "2Cubarbakudan barmen @tural.hasanov.13 “Banketnaya Yubiley ilə Yeni il kokteylləri” layihəsində “Before the snow” kokteylini hazırlamışdı."
    },
    {
        videoSrc: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
        videoDescription: "3Cubarbakudan barmen @tural.hasanov.13 “Banketnaya Yubiley ilə Yeni il kokteylləri” layihəsində “Before the snow” kokteylini hazırlamışdı."
    },
    {
        videoSrc: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
        videoDescription: "4Cubarbakudan barmen @tural.hasanov.13 “Banketnaya Yubiley ilə Yeni il kokteylləri” layihəsində “Before the snow” kokteylini hazırlamışdı."
    },
];

const VideoSessionSliderDescriptionWrapper = () => {
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
            {VIDEO_DESCRIPTION_DATA.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                    <div
                        key={index}
                        className={styles.gridItemWrapper}

                    >
                        {isEven && isMobile ? (
                            <>
                                <div className={styles.description}>{item.videoDescription}</div>
                                <div className={styles.videoWrapper}>
                                    <div className={styles.blurDesign}></div>
                                    <video
                                        controls
                                        muted
                                        loop
                                        playsInline
                                        poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg"
                                    >
                                        <source
                                            src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
                                            type="video/mp4"
                                        />
                                        Sorry, your browser doesn't support embedded videos, but you can
                                        <a
                                            href="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
                                            download="ed_1024_512kb.mp4"
                                        >
                                            download the MP4
                                        </a>
                                        and watch it.
                                    </video>                </div>
                            </>
                        ) : (
                            <>
                                <div className={`${styles.videoWrapper} ${styles.videoLeftWrapper}`}>
                                    <div className={styles.blurDesign}></div>

                                    <video
                                        controls
                                        muted
                                        loop
                                        playsInline
                                        poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg"
                                    >
                                        <source
                                            src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
                                            type="video/mp4"
                                        />
                                        Sorry, your browser doesn't support embedded videos, but you can
                                        <a
                                            href="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
                                            download="ed_1024_512kb.mp4"
                                        >
                                            download the MP4
                                        </a>
                                        and watch it.
                                    </video>                                </div>
                                <div className={styles.description}>{item.videoDescription}</div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default VideoSessionSliderDescriptionWrapper;
