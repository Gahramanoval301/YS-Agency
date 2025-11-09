import { useEffect, useState } from "react"
import styles from "./Footer.module.scss"
import { Link } from 'react-router'
import { getAllContactDetails, type ContactInfo } from "../../api/contact"
import { useTranslation } from "react-i18next"
import MainIconRight from "../../assets/images/Gallery/mainIconRight.png";
import RightArrow from "../../assets/images/Gallery/rightArrow.png";
import YourSincerely from "../../assets/images/Gallery/yourSincerely.png";
import LinkedinIcon from "../../assets/images/Gallery/linkedinIcon.png";
import InstagramIcon from "../../assets/images/Gallery/instagramIcon.png";
import YoutubeIcon from "../../assets/images/Gallery/youtubeIcon.png";
import TiktokIcon from "../../assets/images/Gallery/tiktokIcon.png";

const socialMediaIcons: Record<string, string> = {
    Tk: TiktokIcon,
    Ins: InstagramIcon,
    Ln: LinkedinIcon,
    Yt: YoutubeIcon,
};
const Footer = () => {
    const [contactDetails, setContactDetails] = useState<null | ContactInfo>(null);
    const { t } = useTranslation();



    const FIRST_HALF_MENU_ITEMS = [
        {
            title: t("homepage"),
            link: "/"
        },
        {
            title: t("services"),
            link: "/services"
        },
        {
            title: t("projects"),
            link: "/projects"
        },
    ]

    const SECOND_HALF_MENU_ITEMS = [
        {
            title: t("ourteam"),
            link: ""
        },
        {
            title: t("studio"),
            link: "/studio"
        },
        {
            title: t("contact"),
            link: "/contact"
        },
    ]

    const fetchContactDetails = async () => {
        const resContactDetails = await getAllContactDetails();
        setContactDetails(resContactDetails.contact);
    };

    useEffect(() => {
        fetchContactDetails();
    }, []);

    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerTopDesign}> </div>
            <div className={styles.footerWrapper}>
                <div className={styles.footerContentWrapper}>
                    <div className={styles.greenWrapper}>
                        <div className={styles.greenChild1}>
                            <div className={styles.introWrapper}>
                                <div style={{ transform: "rotateY(180deg)", }}>
                                    <img src={MainIconRight} alt="footer main logo" />
                                </div>
                                <p>YS AGENCY</p>
                            </div>
                            <div className={styles.inputWrapper}>
                                <input type="text" placeholder={t("writeyouremail")} />
                                {/* <p className={styles.icon}>&</p> */}
                                <p className={styles.icon}>
                                    <img src={RightArrow} alt="right arrow" style={{ width: "28px", height: "28px" }} />
                                </p>
                            </div>
                            <div className={styles.socialMediaWrapper}>
                                {contactDetails?.socialMedias.map((socialMedia) => {
                                    const icon = socialMediaIcons[socialMedia.type] || "";

                                    return (
                                        <Link
                                            key={socialMedia.type}
                                            to={socialMedia.value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={icon}
                                                alt={socialMedia.type}
                                                style={{ width: "32px", height: "32px", objectFit: "contain" }}
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.greenChild2}>
                            {contactDetails?.cardsData
                                .filter((card) => ["address", "email"].includes(card.type))
                                .map((card) => {
                                    // Define the display label
                                    const getLabel = (type: string) => {
                                        switch (type) {
                                            case "address":
                                                return t("address");
                                            case "email":
                                                return t("email");
                                            default:
                                                return "";
                                        }
                                    };

                                    const getHref = (type: string, value: string) => {
                                        if (type === "email") return `mailto:${value}`;
                                        if (type === "address") {
                                            const mapCard = contactDetails.cardsData.find((c) => c.type === "map");
                                            return mapCard ? mapCard.value : "#";
                                        }
                                        return "#";
                                    };

                                    return (
                                        <div className={styles.contactInfoWrapper} key={card.type}>
                                            <h5>{getLabel(card.type)}</h5>
                                            <a
                                                href={getHref(card.type, card.value)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.contactLink}
                                            >
                                                <p>
                                                    {card.value}
                                                </p>
                                            </a>
                                        </div>
                                    );
                                })}
                        </div>

                    </div>

                    <div className={styles.blueWrapper}>
                        <div className={styles.blueChild}>{
                            FIRST_HALF_MENU_ITEMS.map((menuItem) => (
                                <Link to={menuItem.link}>
                                    <p>
                                        {menuItem.title}
                                    </p>
                                </Link>
                            ))}</div>
                        <div className={styles.blueChild}>{
                            SECOND_HALF_MENU_ITEMS.map((menuItem) => (
                                <Link to={menuItem.link}>
                                    <p>
                                        {menuItem.title}
                                    </p>
                                </Link>
                            ))}</div>
                        <div className={styles.blueChildFooter}>
                            <img src={YourSincerely} alt="your sincerely" />
                        </div>
                    </div>
                </div>
                <div className={styles.divider}>
                </div>
                <div className={styles.copyrightWrapper}>
                    <p>{t("thewebsitewasdevelopedbywebonly")}</p>
                    <p>{t("copywrite2025allrightsreservedsagency")}.</p>
                </div>
            </div>

        </div>
    )
}

export default Footer
