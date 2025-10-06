import styles from "./MotivationIntro.module.scss";
import GlareHover from '../../../styles/animations/GlareHover';

const MotivationIntro = () => {
    return (
        <div className={styles.motivationIntroContainer}>
            <div className={styles.motivationIntroWrapper}>
                <GlareHover
                    glareColor="#ffffff"
                    playOnce={false}
                    className="motivationTagline"
                >
                    <h5>Sizin uğurunuz bizim hədəfimizdir!</h5>
                </GlareHover>

                <div className={styles.textContent}>
                    <p>
                        Biz yalnız xidmət təminatçısı deyil, həm də biznes inkişafında strateji tərəfdaşınızıq. Fəal komandamız marketinq fəaliyyətlərinizi yüksək səviyyədə saxlamaq üçün sizinlə sıx əməkdaşlıq edərək davamlı dəstək və məlumatlar təqdim edir.
                    </p>

                    <p>Gəlin birlikdə yaradaq!</p>

                    <p>Müasir dövrdə bizneslər mobil və gənc həllərə ehtiyac duyur!</p>

                    <p>
                        Brendinizi yeni səviyyəyə qaldırmaq və əhəmiyyətli nəticələr əldə etmək istəyirsiniz? Bu gün bizimlə əlaqə saxlayın və necə innovativ, brend yönümlü və məlumat əsaslı həllərimizin biznesinizi necə dəyişə biləcəyini öyrənin.
                    </p>
                </div >

                <div className={styles.textContent}>
                    <h5>Gəlin birlikdə yaradaq!</h5>
                    <p>Müasir dövrdə bizneslər mobil və gənc həllərə ehtiyac duyur!</p>

                    <p>
                        Brendinizi yeni səviyyəyə qaldırmaq və əhəmiyyətli nəticələr əldə etmək istəyirsiniz? Bu gün bizimlə əlaqə saxlayın və necə innovativ, brend yönümlü və məlumat əsaslı həllərimizin biznesinizi necə dəyişə biləcəyini öyrənin.
                    </p>
                </div>
            </div>

            <div className={styles.imageContainer}>
                {/* image */}
            </div>
        </div>
    );
};

export default MotivationIntro;
