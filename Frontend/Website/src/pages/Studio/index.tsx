import styles from "./Studio.module.scss"
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import CircularText from '../../styles/animations/CircularText'

const Studio = () => {
    return (
        <div className={styles.studioContainer}>

            <div className={styles.studioWrapper}>
                <Header />
            </div>
            <div className={styles.studioContentWrapper}>
                <div className={styles.titleContainer}>
                    <div className={styles.titleWrapper}>
                        <h1>
                            Studiya
                        </h1>
                    </div>
                    <div className={styles.circularTextWrapper}>

                        <CircularText
                            text="YS*AGENCY*YS*AGENCY*"
                            spinDuration={20}
                        />
                    </div>
                </div>

                <div className={styles.contentWrapper}>

                    <p>
                        YS Agency gənc və enerjili komanda olaraq, sosial media strategiyaları sahəsində ixtisaslaşmışdır. Missiyamız brendlərin rəqəmsal məkanda fərqlənərək innovativ və nəticəyönümlü marketinq yanaşmaları ilə maksimum potensialına çatmasına dəstək olmaqdır.
                    </p>
                    <br />
                    <p>
                        Bu yaxınlarda @ysagency.studio adlı müasir studiyamızı təqdim etdik. Müxtəlif növ fotosessiyalar üçün nəzərdə tutulmuş bu məkan qabaqcıl işıqlandırma və fərqli fon seçimi imkanları ilə yaradıcılığın sərhədlərini genişləndirir.
                    </p>
                    <br />
                    <p>
                        YS Agency olaraq, hər bir müştərinin ehtiyaclarına xüsusi diqqət yetiririk və hər layihəmizdə yüksək keyfiyyət və effektiv nəticələr təmin etməyə çalışırıq.  @YsAgency.az ilə əməkdaşlıq edin, brendinizin daha parlaq görünməsini, auditoriyanızın diqqəti cəlb etməsini və rəqəmsal mühitdə uğurlarınızın zirvəyə çatdırmağınızı təmin edək!
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Studio
