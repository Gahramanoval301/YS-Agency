import { useTranslation } from 'react-i18next';
import CustomSelect from '../../components/shared/CustomSelect';
import PillNav from '../../components/Header/PillNav';
import SidebarNav from '../SidebarNav';
import { useMenuItems } from '../../constants/menuItems';
import styles from './Header.module.scss';
import type { CategoryProps } from '../../api/blog';
import { useEffect, useState } from 'react';
type Language = 'en' | 'az' | 'ru';

const Header = () => {
    const { i18n } = useTranslation();
    const storedLang = (localStorage.getItem('lang') || 'en') as Language;
    const [currentLang, setCurrentLang] = useState<Language>(storedLang);
    const MENU_ITEMS = useMenuItems();

    const options = [
        { id: 'az', title: 'Az' },
        { id: 'en', title: 'En' },
        { id: 'ru', title: 'Ru' },
    ];

    const socialItems = [];

    const handleLanguageChange = (option: CategoryProps) => {
        const lang = option.id as Language;
        setCurrentLang(lang);
        localStorage.setItem('lang', lang); // persist selection
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        console.log(currentLang);

        i18n.changeLanguage(currentLang);
    }, [currentLang]);
    return (
        <>
            <div className={styles.mobileSidebarNav}>
                <SidebarNav
                    position="left"
                    items={MENU_ITEMS}
                    socialItems={socialItems}
                    displaySocials={false}
                    displayItemNumbering
                    menuButtonColor="#fff"
                    openMenuButtonColor="#fff"
                    changeMenuColorOnOpen
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
                </div>
                <div>
                    <CustomSelect
                        defaultValue={i18n.language}
                        options={options}
                        onChange={handleLanguageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default Header;
