import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './PillNav.module.scss';
import { MENU_ITEMS } from '../../../constants/menuItems';

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

  return (
    <div className={styles.pillNavContainer}>
      <div className={styles.logoBox}></div>

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
  );
};

export default PillNav;
