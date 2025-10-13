import styles from "./ContactDataSection.module.scss"

const socialLinks = [
    {
        type: "Ins",
        href: ""
    },
    {
        type: "Ln",
        href: ""
    },
    {
        type: "Tk",
        href: ""
    },
    {
        type: "Yt",
        href: ""
    },
]

const CONTACT_CARDS = [
    {
        id: 0,
        icon: "sd",
        title: "Address",
        text: "Akad, 16a İzzət Orucova, Bakı, Azərbaycan"
    },
    {
        id: 1,
        icon: "sd",
        title: "Elektron poçt",
        text: "sales@ysagency.az"
    },
    {
        id: 2,
        icon: "sd",
        title: "Telefon",
        text: "+994 50 222 22 22"
    },
]
const ContactDataSection = () => {
    return (
        <div className={styles.contactDataSection}>
            <div className={styles.socialDataContainer}>

                <h3>Layihənizi reallaşdırmaq üçün bir addım atın</h3>
                <p>Gələcək ideyalar buradan başlayır</p>

                <div className={styles.socialLinksWrapper}>
                    {
                        socialLinks.map(({ type, href }) => (
                            <a href={href}>
                                <div className={styles.linkWrapper}>
                                    {type}
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>

            <div className={styles.contactCards}>
                {
                    CONTACT_CARDS.map(({ id, icon, text, title }) => (
                        <div className={styles.contactCardWrapper} key={id}>
                            <div>
                                <i >{icon}</i>
                                <h4>{title}</h4>
                            </div>

                            <p>{text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ContactDataSection
