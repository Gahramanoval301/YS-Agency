import PillNav from '../../components/Header/PillNav'
import styles from "./Header.module.scss"
import SidebarNav from '../SidebarNav'
import { MENU_ITEMS } from '../../constants/menuItems'

const Header = () => {
    const socialItems = [
        // { label: 'Twitter', link: 'https://twitter.com' },
        // { label: 'GitHub', link: 'https://github.com' },
        // { label: 'LinkedIn', link: 'https://linkedin.com' }
    ];
    return (
        <>
        <div className={styles.mobileSidebarNav}>

            <SidebarNav
                position="left"
                items={MENU_ITEMS}
                socialItems={socialItems}
                displaySocials={false}
                displayItemNumbering={true}
                menuButtonColor="#fff"
                openMenuButtonColor="#fff"
                changeMenuColorOnOpen={true}
                colors={['#7044C6', 'rgba(0, 0, 0, 0.26)']}
                logoUrl="/path-to-your-logo.svg"
                accentColor="#fff"
                onMenuOpen={() => console.log('Menu opened')}
                onMenuClose={() => console.log('Menu closed')}
                />
                </div>
            <div className={styles.headerWrapper}>
                <div>
                    <PillNav />
                    {/* <MobileHamburgMenu/> */}

                </div>
                <button>
                    Daxil Ol
                </button>
            </div>
        </>
    )
}

export default Header
