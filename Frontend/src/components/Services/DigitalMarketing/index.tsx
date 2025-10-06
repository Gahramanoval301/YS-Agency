import { useState } from "react";
import styles from "./DigitalMarketing.module.scss";
import SplitTextAnimation from "../../../styles/animations/AnimatedSplitText";

type Category = {
    title: string;
    options: string[];
};

const MARKETING_DATA: Record<string, Category> = {
    brand: {
        title: "Brend",
        options: [
            "Brendinq",
            "Brend İdentikliyi",
            "Strateji Planlaşdırma",
            "İstehsalat",
            "Qrafik Dizayn",
        ],
    },
    marketing: {
        title: "Marketing",
        options: [
            "Marketinq Strategiyası",
            "PR Strategiyası",
            "Marketinq Kampaniyaları",
            "Marketinq Analitikası",
            "Rəqib Analizi",
            "Tədbir İdarəetməsi",
            "Kopiraytinq",
        ],
    },
    digitalMarketing: {
        title: "Rəqəmsal Marketing",
        options: [
            "Sosial Media Marketinqi",
            "Məzmun Marketinqi",
            "Reklam Kampaniyaları",
            "Təsirçi Marketinq",
            "Səhifə Analizi",
            "Foto və Video Çəkilişlər",
        ],
    },
};

const DigitalMarketing = () => {
    const [activeCategory, setActiveCategory] = useState<Category | null>(null); // ✅ explicitly typed

    return (
        <div className={styles.digitalMarketingContainer}>
            {/* Left side — cards */}
            <div className={styles.serviceCardsWrapper}>
                {Object.values(MARKETING_DATA).map((category, idx) => (
                    <div
                        key={idx}
                        className={`${styles.serviceCard} ${
                            activeCategory?.title === category.title ? styles.activeCard : ""
                        }`}
                        onMouseEnter={() => setActiveCategory(category)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <span className={styles.number}>{`0${idx + 1}`}</span>
                        <div className={styles.titleWrapper}>
                            <h3 className={styles.serviceCardTitle}>{category.title}</h3>
                            <div className={styles.iconWrapper}>
                                <span>➡</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right side — dynamic options */}
            <div className={styles.optionsContainer}>
                <SplitTextAnimation />
                <div className={styles.splitTextAnimationWrapper}></div>
                {activeCategory && (
                    <ul className={styles.serviceCardList}>
                        {activeCategory.options.map((option, i) => (
                            <li key={i} className={styles.serviceCardItem}>
                                <span>❤</span>
                                <p>{option}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DigitalMarketing;
