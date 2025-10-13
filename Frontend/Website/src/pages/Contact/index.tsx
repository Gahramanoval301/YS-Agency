import MainLayout from '../../layouts/HeroSection'
import ContactDataSection from '../../components/Contact/ContactDataSection'

const Contact = () => {
    return (
        <>
            <MainLayout title={"Əlaqə"} isContact>
                <ContactDataSection />
            </MainLayout>
        </>
    )
}

export default Contact
