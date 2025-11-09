
import Drawer from '@mui/material/Drawer';
import styles from "./MobileSidebar.module.css"
import { Link, useLocation } from 'react-router';
import { SIDEBAR_NAV_LINKS } from '../../../data/sidebarNavLinks';
import MainIconRight from "../../../assets/mainIconRight.png";

export default function MobileSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const location = useLocation();

    const DrawerList = (
        <div className={styles.sidebarWrapper} onClick={() => setIsOpen(false)}>
            <div className="flex gap-2 text-[21px] font-semibold mb-6 text-white">
                <img src={MainIconRight} alt="MainIconRight" style={{ transform: "rotateY(180deg)" }} />
                <h3>YS Agency</h3>
            </div>

            <div className="flex flex-col gap-5">
                {SIDEBAR_NAV_LINKS.map((navLink) => {
                    const isActive = location.pathname === navLink.link;

                    return (
                        <Link key={navLink.link} to={navLink.link}>
                            <div
                                className={`flex gap-2 items-center ${styles.sidebarNavlink} ${isActive ? styles.sidebarActiveNavLink : ""
                                    }`}
                            >
                                <i>💛</i>
                                <p>{navLink.label}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div>
            <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}