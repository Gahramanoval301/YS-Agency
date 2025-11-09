import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./ContactFormSection.module.scss";
import { useEffect, useState } from "react";
import { getAllContactDetails, sendClientMessage, type ContactInfo } from "../../../api/contact";
import { useTranslation } from "react-i18next";

const ContactFormSection = () => {
    const [contactDetails, setContactDetails] = useState<null | ContactInfo>(null);
    const { t } = useTranslation();

    const schema = Yup.object().shape({
        firstName: Yup.string()
            .required(t("enteryourname"))
            .min(2, t("minimum2symbol")),
        lastName: Yup.string()
            .required(t("enteryourlastname"))
            .min(2, t("minimum2symbol")),
        email: Yup.string()
            .email(t("pleaseenteravalidemail"))
            .required(t("emailisrequired")),
        phoneNumber: Yup.string()
            .matches(/^\+?\d{9,15}$/, t("pleaseenteravalidphonenumber"))
            .required(t("phonenumberisrequired")),
        comment: Yup.string()
            .required(t("messagecannotbeempty"))
            .min(5, t("minimum5symbol")),
    });

    const fetchContactDetails = async () => {
        const resContactDetails = await getAllContactDetails();
        setContactDetails(resContactDetails.contact);
    };

    useEffect(() => {
        fetchContactDetails();
    }, []);

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
        const resData = await sendClientMessage(data);

        if (resData) {
            alert(t("thankyouforcontactingusyourmessagehasbeensentsuccessfullyandwellgetbacktoyoushortly"))
            reset();
        }
    };

    return (
        <div className={styles.contactFormContainer}>
            <iframe
                title={contactDetails?.cardsData[3].type}
                src={contactDetails?.cardsData[3].value}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className={styles.contactFormWrapper}>
                <h3>{t("letsdiscoverthetruevalueofmarketingtogether")}</h3>
                <p>{t("youcansendusyourquestionssuggestionsandprojectideas")}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formSmallSection}>
                        <div className={styles.inputGroup}>
                            <input {...register("firstName")} placeholder={t("yourname")} />
                            {errors.firstName && (
                                <span className={styles.error}>{errors.firstName.message}</span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <input {...register("lastName")} placeholder={t("yourlastname")} />
                            {errors.lastName && (
                                <span className={styles.error}>{errors.lastName.message}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.formSmallSection}>
                        <div className={styles.inputGroup}>
                            <input {...register("email")} placeholder={t("youremail")} />
                            {errors.email && (
                                <span className={styles.error}>{errors.email.message}</span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <input {...register("phoneNumber")} placeholder={t("yourphonenumber")} />
                            {errors.phoneNumber && (
                                <span className={styles.error}>{errors.phoneNumber.message}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            {...register("comment")}
                            placeholder={t("writeyourmessage")}
                        />
                        {errors.comment && (
                            <span className={styles.error}>{errors.comment.message}</span>
                        )}
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? t("sending") : t("send")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactFormSection;
