import React from 'react'
import styles from "./Services.module.scss"
import MainLayout from '../../layouts/HeroSection'
import DigitalMarketing from '../../components/Services/DigitalMarketing'

const Services = () => {
    return (
        <MainLayout title={"Xidmetlerimiz"}>
            <DigitalMarketing />
        </MainLayout>
    )
}

export default Services
