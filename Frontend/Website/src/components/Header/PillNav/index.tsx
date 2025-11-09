import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './PillNav.module.scss';
import { useMenuItems } from '../../../constants/menuItems';
import MainIcon from "../../../assets/images/Gallery/mainIcon.png";


export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
}

const PillNav: React.FC<PillNavProps> = ({
}) => {
  const location = useLocation();
  const MENU_ITEMS = useMenuItems();
  return (
    <div className={styles.pillNavContainer}>
      {/* <div className={styles.logoBox}></div> */}
      <div className={styles.mainLogoBox}>
        <img src={MainIcon} alt="main icon" />
      </div>

      <div className={styles.navLinkSection}>

        {MENU_ITEMS.map((menuItem) => {
          const isActive = location.pathname === menuItem.link;

          return (
            <div
              key={menuItem.link}
              className={`${styles.menuItem} ${isActive ? styles.activeMenuItem : ''}`}
            >
              <Link to={menuItem.link}>{menuItem.label}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PillNav;
