import { useEffect, useState } from 'react'
import AgencyIntro from '../../components/About/AgencyIntro'
import MotivationIntro from '../../components/About/MotivationIntro'
import MainLayout from '../../layouts/HeroSection'
import { getAboutData } from '../../api/about'
import { useTranslation } from 'react-i18next'

const About = () => {
    const { t } = useTranslation();
    const [aboutData, setAboutData] = useState(null);

    const fetchAboutData = async () => {
        const resData = await getAboutData();
        setAboutData(resData.data);
    }

    useEffect(() => {
        fetchAboutData();
    }, [])

    if (!aboutData) {
        return <>{t("loading")}...</>
    }

    return (
        <MainLayout title={t("about")}  >
            <AgencyIntro data={aboutData} />
            <MotivationIntro data={aboutData} />
        </MainLayout>


    )
}

export default About
