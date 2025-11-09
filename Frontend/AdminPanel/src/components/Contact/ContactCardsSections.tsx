import { PenLine, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import TextField from "../common/TextField";

interface ContactCardsSectionProps {
    formik: any;
}

const ContactCardsSection = ({ formik }: ContactCardsSectionProps) => {
    const [isEdit, setIsEdit] = useState(false);

    const cardsData = formik.values.cardsData || [];

    const getLabel = (type: string) => {
        switch (type) {
            case "address":
                return "Address";
            case "email":
                return "Email";
            case "tel":
                return "Phone Number";
            case "map":
                return "Map URL";
            default:
                return type;
        }
    };

    const isValidMapUrl = (url: string) => {
        if (!url) return false;

        try {
            const parsed = new URL(url);

            if (!["http:", "https:"].includes(parsed.protocol)) return false;

            const hostname = parsed.hostname.toLowerCase();

            const validHosts = [
                "maps.google.com",
                "www.google.com",
                "goo.gl",
            ];

            if (!validHosts.some((host) => hostname.includes(host))) return false;

            if (!parsed.pathname.includes("maps") && !parsed.search.includes("maps")) {
                return false;
            }

            return true;
        } catch {
            return false; 
        }
    };



    return (
        <div className="formSection" style={{ padding: "2rem", marginTop: "2rem" }}>
            <div className="flex items-center justify-end">
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setIsEdit((prev) => !prev)}
                >
                    <PenLine />
                </button>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
                {cardsData.map((card: any, index: number) => {
                    const showIcon = card.type === "map" && isValidMapUrl(card.value);

                    return (
                        <div key={index} style={{ marginBottom: "1rem" }}>
                            <label
                                htmlFor={`cardsData[${index}].value`}
                                className="common-label"
                            >
                                {getLabel(card.type)}
                            </label>

                            <TextField
                                formik={formik}
                                name={`cardsData[${index}].value`}
                                placeholder={`Enter ${getLabel(card.type)}`}
                                className="common-text-field"
                                isEdit={isEdit}
                                icon={showIcon ? <LinkIcon /> : undefined} // 👈 conditional icon
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContactCardsSection;