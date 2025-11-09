import { useEffect, useState } from "react";
import styles from "./DigitalMarketing.module.scss";
import SplitTextAnimation from "../../../styles/animations/AnimatedSplitText";
import { getAllServices, type ServiceBackResProps } from "../../../api/service";
import ServiceCard from "../ServiceCard.tsx";

const DigitalMarketing = () => {
    const [activeCategory, setActiveCategory] = useState<ServiceBackResProps | null>(null);
    const [services, setServices] = useState<ServiceBackResProps[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 1024);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const fetchServices = async () => {
        const resData = await getAllServices();
        setServices(resData);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className={styles.digitalMarketingContainer}>
            {
                isMobile &&
                <div>
                    <SplitTextAnimation />
                </div>
            }
            <div className={styles.serviceCardsWrapper}>


                {services.map((service, idx) => (
                    <ServiceCard key={service.id} service={service} isMobile={isMobile} idx={idx} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                ))}
            </div>

            <div className={styles.optionsContainer}>
                <SplitTextAnimation />
                <div className={styles.splitTextAnimationWrapper}></div>
                {activeCategory && (
                    <ul className={styles.serviceCardList}>
                        {activeCategory.includes.map((option, i) => (
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
