import { Link, useLocation } from "react-router"
import styles from "./Sidebar.module.css"
import { SIDEBAR_NAV_LINKS } from "../../../data/sidebarNavLinks";


const Sidebar = () => {
  const location = useLocation();

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.blurShineDesign}></div>
      <div className="flex gap-2 text-[21px] font-semibold mb-6">
        <i>🌸</i>
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
}

export default Sidebar
