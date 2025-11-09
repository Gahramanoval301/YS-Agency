import styles from "./BlogShare.module.scss";
import LinkedinIcon from "../../../assets/images/Gallery/linkedinIcon.png";
import InstagramIcon from "../../../assets/images/Gallery/instagramIcon.png";
import YoutubeIcon from "../../../assets/images/Gallery/youtubeIcon.png";
import TiktokIcon from "../../../assets/images/Gallery/tiktokIcon.png";

interface BlogShareProps {
    blogUrl: string; // URL of the current blog page
    blogTitle?: string;
}

const BlogShare = ({ blogUrl }: BlogShareProps) => {

    const encodedUrl = encodeURIComponent(blogUrl);
    // const encodedTitle = encodeURIComponent(blogTitle);

    const socialMediaIcons: Record<string, string> = {
        Tk: TiktokIcon,
        Ins: InstagramIcon,
        Ln: LinkedinIcon,
        Yt: YoutubeIcon,
    };

    const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        instagram: `https://www.instagram.com/`,
        tiktok: `https://www.tiktok.com/upload?url=${encodedUrl}`,
        youtube: `https://www.youtube.com/`,
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
                <button onClick={() => handleClick("linkedin")} title="Share on LinkedIn">
                    <div className={styles.iconWrapper}>
                        <img
                            src={socialMediaIcons.Ln}
                            alt="Share on LinkedIn"
                            style={{ width: "40px", height: "40px", objectFit: "contain" }}
                        />
                    </div>
                </button>
                <button onClick={() => handleClick("instagram")} title="Share on Instagram">
                    <div className={styles.iconWrapper}>
                        <img
                            src={socialMediaIcons.Ins}
                            alt="Share on Instagram"
                            style={{ width: "40px", height: "40px", objectFit: "contain" }}
                        />
                    </div>
                </button>
                <button onClick={() => handleClick("tiktok")} title="Share on TikTok">
                    <div className={styles.iconWrapper}>
                        <img
                            src={socialMediaIcons.Tk}
                            alt="Share on TikTok"
                            style={{ width: "40px", height: "40px", objectFit: "contain" }}
                        />
                    </div>
                </button>
                <button onClick={() => handleClick("youtube")} title="Share on YouTube">
                    <div className={styles.iconWrapper}>
                        <img
                            src={socialMediaIcons.Yt}
                            alt="Share on YouTube"
                            style={{ width: "40px", height: "40px", objectFit: "contain" }}
                        />
                    </div>
                </button>
            </div>
    );
};

export default BlogShare;
