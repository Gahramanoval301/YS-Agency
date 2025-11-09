import { useEffect, useState } from "react";
import styles from "./ContactDataSection.module.scss";
import { getAllContactDetails, type ContactInfo } from "../../../api/contact";
import LinkedinIcon from "../../../assets/images/Gallery/linkedinIcon.png";
import InstagramIcon from "../../../assets/images/Gallery/instagramIcon.png";
import YoutubeIcon from "../../../assets/images/Gallery/youtubeIcon.png";
import TiktokIcon from "../../../assets/images/Gallery/tiktokIcon.png";
import { Link } from "react-router";

const typeLabels: Record<string, string> = {
    address: "Address",
    email: "Email",
    tel: "Telefon",
};

const socialMediaIcons: Record<string, string> = {
    Tk: TiktokIcon,
    Ins: InstagramIcon,
    Ln: LinkedinIcon,
    Yt: YoutubeIcon,
};
const ContactDataSection = () => {
    const [contactDetails, setContactDetails] = useState<null | ContactInfo>(null);

    const fetchContactDetails = async () => {
        const resContactDetails = await getAllContactDetails();
        setContactDetails(resContactDetails.contact);
    };

    useEffect(() => {
        fetchContactDetails();
    }, []);

    const mapLink = contactDetails?.cardsData?.find((item) => item.type === "map")?.value || "";

    return (
        <div className={styles.contactDataSection}>
            <div className={styles.socialDataContainer}>
                <h3>{contactDetails?.headline}</h3>
                <p className="max-3-line-text">{contactDetails?.subHeadline}</p>

                <div className={styles.socialLinksWrapper}>
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
                                    style={{ width: "40px", height: "40px", objectFit: "contain" }}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className={styles.contactCards}>
                {contactDetails?.cardsData
                    ?.filter(({ value, type }) => value && type !== "map")
                    .map(({ type, value }) => {
                        let href = "";
                        if (type === "email") href = `https://mail.google.com/mail/?view=cm&to=${value}`;
                        else if (type === "tel") href = `tel:${value}`;
                        else if (type === "address" && mapLink) href = mapLink;

                        const clickable = Boolean(href);

                        return (
                            <a
                                key={type}
                                href={href || undefined}
                                target={type === "address" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className={`${styles.contactCardWrapper} ${clickable ? styles.clickable : ""}`}
                            >
                                <div>
                                    <i>{type}</i>
                                    <h4>{typeLabels[type] || type}</h4>
                                </div>
                                <p>{value}</p>
                            </a>
                        );
                    })}
            </div>
        </div>
    );
};

export default ContactDataSection;
