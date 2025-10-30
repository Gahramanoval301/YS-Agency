// import styles from "./.module.scss"
import { useEffect, useState } from 'react'
import AgencyIntro from '../../components/About/AgencyIntro'
import MotivationIntro from '../../components/About/MotivationIntro'
import MainLayout from '../../layouts/HeroSection'
import { getAboutData } from '../../api/about'

const About = () => {
    const [aboutData, setAboutData] = useState(null);

    const fetchAboutData = async () => {
        const resData = await getAboutData();
        setAboutData(resData.data);
    }

    useEffect(() => {
        fetchAboutData();
    }, [])

    if (!aboutData) {
        return <>Loading...</>
    }

    return (

        <MainLayout title={"Haqqimizda"}  >
            <AgencyIntro data={aboutData} />
            <MotivationIntro data={aboutData} />
        </MainLayout>


    )
}

export default About
