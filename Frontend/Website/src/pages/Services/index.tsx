
import MainLayout from '../../layouts/HeroSection'
import DigitalMarketing from '../../components/Services/DigitalMarketing'
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t } = useTranslation();

    return (
        <MainLayout title={t("services")}>
            <DigitalMarketing />
        </MainLayout>
    )
}

export default Services
