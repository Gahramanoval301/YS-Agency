import React from "react";
import styles from "./BlogShare.module.scss";

interface BlogShareProps {
    blogUrl: string; // URL of the current blog page
    blogTitle: string;
}

const BlogShare = ({ blogUrl, blogTitle }: BlogShareProps) => {

    // Encode URL and title for sharing
    const encodedUrl = encodeURIComponent(blogUrl);
    const encodedTitle = encodeURIComponent(blogTitle);

    // Platform share URLs
    const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        instagram: `https://www.instagram.com/`, // Instagram doesn’t support web sharing
        tiktok: `https://www.tiktok.com/upload?url=${encodedUrl}`, // TikTok web share is limited
        youtube: `https://www.youtube.com/`, // YouTube doesn’t allow direct URL sharing
    };

    const handleClick = (platform: keyof typeof shareLinks) => {
        const url = shareLinks[platform];
        if (platform === "instagram" || platform === "youtube" || platform === "tiktok") {
            alert(`${platform} cannot be directly shared via web. Please open app to share!`);
            return;
        }
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className={styles.socialMediasWrapper}>
            <div >
                <button onClick={() => handleClick("linkedin")} title="Share on LinkedIn">
                    <div className={styles.iconWrapper}>
                        <i>Ln</i>
                    </div>
                </button>
                <button onClick={() => handleClick("instagram")} title="Share on Instagram">
                    Ins
                    <div className={styles.iconWrapper}>
                        <i>Ins</i>
                    </div>
                </button>
                <button onClick={() => handleClick("tiktok")} title="Share on TikTok">

                    <div className={styles.iconWrapper}>
                        <i>Tk</i>
                    </div>
                </button>
                <button onClick={() => handleClick("youtube")} title="Share on YouTube">

                    <div className={styles.iconWrapper}>
                        <i>Yt</i>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default BlogShare;
