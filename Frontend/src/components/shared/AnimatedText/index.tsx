// src/components/AnimatedText.tsx
import React from "react";
import type { FC } from "react";
import styles from "./AnimatedText.module.scss";
import SplitText from "../../../styles/animations/SplitText";

interface AnimatedTextProps {
    text: string;
    delay?: number;
    duration?: number;
    fontSize?: string;
    color?: string;
    textShadow?: string;
    className?: string;
    parentClassname?: string;
}

const AnimatedText: FC<AnimatedTextProps> = ({
    text,
    delay = 100,
    duration = 0.6,
    fontSize = "32px",
    color = "#fff",
    className = "",
    parentClassname = ""
}) => {
    return (
        <div
            className={`${styles.animatedText} ${className}  ${styles[parentClassname]}`}
            style={{ fontSize, color }}
        >

            <SplitText
                text={text}
                delay={delay}
                duration={duration}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-100px"
            />
        </div>
    );
};

export default AnimatedText;
