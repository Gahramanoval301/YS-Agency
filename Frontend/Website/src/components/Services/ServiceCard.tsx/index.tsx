import React  from "react";
import type { ServiceBackResProps } from "../../../api/service";
import styles from "../DigitalMarketing/DigitalMarketing.module.scss";

interface ServiceCardProps {
    service: ServiceBackResProps;
    idx: number;
    setActiveCategory: React.Dispatch<React.SetStateAction<ServiceBackResProps | null>>;
    activeCategory: ServiceBackResProps | null;
    isMobile: boolean;
}

const ServiceCard = ({
    service,
    idx,
    setActiveCategory,
    activeCategory,
    isMobile
}: ServiceCardProps) => {


    const handleClick = (service: ServiceBackResProps) => {
        setActiveCategory((prev) => (prev?.id === service.id ? null : service));
    };

    const handleMouseEnter = (service: ServiceBackResProps) => {
        if (!isMobile) setActiveCategory(service);
    };

    const handleMouseLeave = () => {
        if (!isMobile) setActiveCategory(null);
    };

    const isActive = activeCategory?.id === service.id;

    return (
        <div className={styles.serviceCardWrapper}>
            <div
                key={service.id}
                className={`${styles.serviceCard} ${isActive ? styles.activeCard : ""}`}
                onClick={() => isMobile && handleClick(service)}
                onMouseEnter={() => !isMobile && handleMouseEnter(service)}
                onMouseLeave={() => !isMobile && handleMouseLeave()}
            >
                <span className={styles.number}>{`0${idx + 1}`}</span>
                <div className={styles.titleWrapper}>
                    <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                    <div className={styles.iconWrapper}>
                        <span>➡</span>
                    </div>
                </div>

                {isActive && (
                    <ul className={styles.mobileIncludesList}>
                        {service.includes.map((option, i) => (
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

export default ServiceCard;
