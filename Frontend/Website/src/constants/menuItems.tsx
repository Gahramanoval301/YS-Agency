import { useTranslation } from "react-i18next";

export const useMenuItems = () => {
  const { t } = useTranslation();

  return [
    { label: t('home'), link: '/', ariaLabel: 'Ana səhifəyə keçid' },
    { label: t('about'), link: '/about', ariaLabel: 'Haqqımızda səhifəsinə keçid' },
    { label: t('services'), link: '/services', ariaLabel: 'Xidmətlərimiz səhifəsinə keçid' },
    { label: t('projects'), link: '/projects', ariaLabel: 'Layihələrimiz səhifəsinə keçid' },
    { label: t('studio'), link: '/studio', ariaLabel: 'Studiya səhifəsinə keçid' },
    { label: t('contact'), link: '/contact', ariaLabel: 'Əlaqə səhifəsinə keçid' },
    { label: t('blogs'), link: '/blogs', ariaLabel: 'Bloq səhifəsinə keçid' },
  ];
} 