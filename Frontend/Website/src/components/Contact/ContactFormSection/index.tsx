import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./ContactFormSection.module.scss";

const schema = Yup.object().shape({
    firstName: Yup.string()
        .required("Adınızı daxil edin")
        .min(2, "Minimum 2 simvol"),
    lastName: Yup.string()
        .required("Soyadınızı daxil edin")
        .min(2, "Minimum 2 simvol"),
    email: Yup.string()
        .email("Düzgün e-poçt daxil edin")
        .required("E-poçt tələb olunur"),
    phone: Yup.string()
        .matches(/^\+?\d{9,15}$/, "Düzgün telefon nömrəsi daxil edin")
        .required("Telefon nömrəsi tələb olunur"),
    message: Yup.string()
        .required("Mesaj boş ola bilməz")
        .min(5, "Minimum 5 simvol"),
});

const ContactFormSection = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        console.log("Göndərilən məlumat:", data);
        alert("Mesajınız göndərildi!");
        reset();
    };

    return (
        <div className={styles.contactFormContainer}>
            <iframe
                title="YS Agency Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.222927409998!2d49.87352987586586!3d40.381751571445285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883ae7521aa383d7%3A0xe24c638ef093d115!2sYS%20Agency!5e0!3m2!1saz!2saz!4v1759859651333!5m2!1saz!2saz"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className={styles.contactFormWrapper}>
                <h3>Gəlin marketinqin əsl dəyərini birlikdə kəşf edək!</h3>
                <p>Bizə suallarınızı, təkliflərinizi və layihə ideyalarınızı göndərə bilərsiniz.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formSmallSection}>
                        <div className={styles.inputGroup}>
                            <input {...register("firstName")} placeholder="Adınız" />
                            {errors.firstName && (
                                <span className={styles.error}>{errors.firstName.message}</span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <input {...register("lastName")} placeholder="Soyadınız" />
                            {errors.lastName && (
                                <span className={styles.error}>{errors.lastName.message}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.formSmallSection}>
                        <div className={styles.inputGroup}>
                            <input {...register("email")} placeholder="E-poçt Ünvanınız" />
                            {errors.email && (
                                <span className={styles.error}>{errors.email.message}</span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <input {...register("phone")} placeholder="Telefon nömrəniz" />
                            {errors.phone && (
                                <span className={styles.error}>{errors.phone.message}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            {...register("message")}
                            placeholder="Mesajınızı yazın..."
                        />
                        {errors.message && (
                            <span className={styles.error}>{errors.message.message}</span>
                        )}
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Göndərilir..." : "Göndər"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactFormSection;
