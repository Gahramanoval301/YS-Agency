// import styles from "./.module.scss"
import AgencyIntro from '../../components/About/AgencyIntro'
import MotivationIntro from '../../components/About/MotivationIntro'
import MainLayout from '../../layouts/HeroSection'

const About = () => {

    return (

        <MainLayout title={"Haqqimizda"}  >
            <AgencyIntro/>
            <MotivationIntro/>
        </MainLayout>
    

    )
}

export default About
