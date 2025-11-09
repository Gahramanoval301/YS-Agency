import MainLayout from '../../layouts/HeroSection'
import ContactDataSection from '../../components/Contact/ContactDataSection'
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    return (
        <>
            <MainLayout title={t("contact")} isContact>
                <ContactDataSection />
            </MainLayout>
        </>
    )
}

export default Contact
