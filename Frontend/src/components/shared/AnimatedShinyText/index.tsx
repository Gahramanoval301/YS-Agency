import React from "react";
import type { FC } from "react";
import styles from "./AnimatedShinyText.module.scss";
import ShinyText from "../../../styles/animations/ShinyText";

interface AnimatedShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
  disabled?: boolean;
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  text,
  className = "customShinyText1",
  speed = 3,
  disabled = false,
}) => {
  return (
    <div className={`${styles.wrapper} `}>
      <ShinyText text={text} speed={speed} disabled={disabled} className={styles[className]} />
    </div>
  );
};

export default AnimatedShinyText;
