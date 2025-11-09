import { PenLine, Instagram, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import TextField from "../common/TextField";

const Tiktok = (props:any) => (
  <svg
    fill="#000000"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    id="tiktok"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
    {...props}
  >
    <path
      id="primary"
      d="M21,7V9a1,1,0,0,1-1,1,8,8,0,0,1-4-1.08V15.5A6.5,6.5,0,1,1,6.53,9.72a1,1,0,0,1,1.47.9v2.52a.92.92,0,0,1-.28.62,2.49,2.49,0,0,0,2,4.23A2.61,2.61,0,0,0,12,15.35V3a1,1,0,0,1,1-1h2.11a1,1,0,0,1,1,.83A4,4,0,0,0,20,6,1,1,0,0,1,21,7Z"
      style={{
        fill: "rgb(255, 255, 255)",
      }}
    />
  </svg>
);

interface ContactSocialMediasSectionProps {
  formik: any;
}

const ContactSocialMediasSection = ({ formik }: ContactSocialMediasSectionProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const socialMedias = formik.values.socialMedias || [];

  // Map type → icon component
  const getSocialIcon = (type: string) => {
    switch (type) {
      case "Ins":
        return <Instagram />;
      case "Ln":
        return <Linkedin />;
      case "Tk":
        return <Tiktok />;
      case "Yt":
        return <Youtube />;
      default:
        return null;
    }
  };

  // Optional: simple URL validation for social links
  const isValidSocialUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Convert type to readable label
  const getLabel = (type: string) => {
    switch (type) {
      case "Ins":
        return "Instagram";
      case "Ln":
        return "LinkedIn";
      case "Tk":
        return "TikTok";
      case "Yt":
        return "YouTube";
      default:
        return type;
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
        {socialMedias.map((social: any, index: number) => {
          const validUrl = isValidSocialUrl(social.value);
          const icon = validUrl ? getSocialIcon(social.type) : undefined;

          return (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <label
                htmlFor={`socialMedias[${index}].value`}
                className="common-label"
              >
                {getLabel(social.type)}
              </label>

              <TextField
                formik={formik}
                name={`socialMedias[${index}].value`}
                placeholder={`Enter ${getLabel(social.type)} URL`}
                className="common-text-field"
                isEdit={isEdit}
                icon={icon} // Show icon if URL is valid
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactSocialMediasSection;
