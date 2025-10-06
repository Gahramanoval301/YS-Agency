import styles from "./AgencyIntro.module.scss";
import GlareHover from '../../../styles/animations/GlareHover';

const AgencyIntro = () => {
    return (
        <div className={styles.sectionContainer}>
            <div className={styles.introWrapper}>
                <h2>Sizin Peşəkar Tərəfdaşınız!</h2>
                <p>Yeni nəsil brendinq, marketinq və rəqəmsal xidmətlər agentliyi.</p>
                {/* image */}
            </div>
            <div className={styles.infoWrapper}>
                <GlareHover
                    glareColor="#ffffff"
                    playOnce={false}
                    className="agencyTagline"
                >
                    <h5>Gəncik, mobil və sosialıq!</h5>
                </GlareHover>

                <p>

                    <p>
                        <p>

                            Peşəkar və enerjili komandamız brendinq, rəqəmsal marketinq və dizayn sahələrində geniş təcrübəyə malikdir, bu da bizə fərdi yanaşmalar yaratmağa və nəticə verən həllər təqdim etməyə imkan verir.
                        </p>
                        <p>
                            Yeni və dinamik yanaşmamız şablonları qırır və brendinizə uyğun unikal strategiyalar təqdim edir.
                        </p>
                        <p>

                            Biz biznesinizin tələblərinə uyğun qeyri-adi həllər hazırlayırıq.
                        </p>
                    </p>
                </p>

                <p>
                    Fəlsəfəmiz və təcrübəmiz şablonları qırmağa və hər müştəriyə fərdi yanaşma tapmağa imkan verir. Biz brendin inkişafına, strateji yanaşmaya və yaradıcı dizayna yönəlmişik və yaradıcı mükəmməllik prinsiplərinə sadiq qalırıq.
                    Brendi inkişaf etdirmək üçün strateji yanaşmalar tətbiq edir və kreativ dizaynla irəliləyirik. Yaradıcı mükəmməlliyə olan bağlılığımız isə işimizin əsasını təşkil edir.
                </p>
            </div>
        </div>
    );
};

export default AgencyIntro;
