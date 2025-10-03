import React from 'react'
import styles from "./Footer.module.scss"
import { Link } from 'react-router'

const SOCIAL_MEDIAS = [
    {
        logo: "Ins",
        href: ""
    },
    {
        logo: "Lin",
        href: ""
    },
    {
        logo: "Tik",
        href: ""
    },
    {
        logo: "You",
        href: ""
    },
]

const CONTACT_DETAILS = [
    {
        subTitle: "Address",
        text: "Akad, 16a İzzət Orucova, Bakı, Azərbaycan"
    },
    {
        subTitle: "Email",
        text: "sales@ysagency.az"
    },
]

const FIRST_HALF_MENU_ITEMS = [
    {
        title: "Əsas səhifə",
        link: ""
    },
    {
        title: "Xidmətlərimiz",
        link: ""
    },
    {
        title: "Layihələrimiz",
        link: ""
    },
]

const SECOND_HALF_MENU_ITEMS = [
    {
        title: "Komandamız",
        link: ""
    },
    {
        title: "Studiya",
        link: ""
    },
    {
        title: "Əlaqə",
        link: ""
    },
]
const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerTopDesign}>

            </div>
            <div className={styles.footerWrapper}>
                <div className={styles.footerContentWrapper}>
                    {/* First column */}
                    <div className={styles.greenWrapper}>
                        <div className={styles.greenChild1}>
                            <div className={styles.introWrapper}>
                                <div>
                                    {/* logo */}
                                </div>
                                <p>YS AGENCY</p>
                            </div>
                            <div className={styles.inputWrapper}>
                                <input type="text" placeholder={"Write your email"} />
                                <p className={styles.icon}>&</p>
                            </div>
                            <div className={styles.socialMediaWrapper}>
                                {
                                    SOCIAL_MEDIAS.map((socialMedia) => (
                                        <Link to={socialMedia.href}>
                                            <div>
                                                {socialMedia.logo}
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles.greenChild2}>
                            {CONTACT_DETAILS.map((contactInfo) => (
                                <div className={styles.contactInfoWrapper}>
                                    <h5>{contactInfo.subTitle}</h5>
                                    <p>{contactInfo.text}</p>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Second column */}
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
                            Your Sincerely
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
