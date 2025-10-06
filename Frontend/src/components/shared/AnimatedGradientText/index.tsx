import type { FC} from 'react' 
import styles from "./AnimatedGradientText.module.scss";
import GradientText from "../../../styles/animations/GradientText";

interface AnimatedGradientTextProps {
  title:string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

const AnimatedGradientText: FC<AnimatedGradientTextProps> = ({
  colors = ["#fff", "#00000062"],
  animationSpeed = 3,
  showBorder = false,
  className = "",
  title
}) => {
  return (
    <div className={`${styles.wrapper}`}>
      <GradientText
        colors={colors}
        animationSpeed={animationSpeed}
        showBorder={showBorder}
        className={styles[className]}
      >
        {title}
      </GradientText>
    </div>
  );
};

export default AnimatedGradientText;
