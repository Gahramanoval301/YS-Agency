import * as Yup from "yup";
export interface TextItem {
  headline: string;
  content: string;
}

export interface Statistics {
  projects: string;
  annualSuccessActivity: string;
  partnership: string;
  ourTeam: string;
}

export interface AboutFormValues {
  statistics: Statistics;
  texts: TextItem[];
  image: File | null;
}

export const aboutInitialValues = {
  statistics: {
    projects: "",
    annualSuccessActivity: "",
    partnership: "",
    ourTeam: "",
  },
  texts: [
    { headline: "", content: "" },
    { headline: "", content: "" },
  ],
  image: null,
}
const hasVisibleContent = (html) => {
  if (!html) return false;
  const stripped = html.replace(/<[^>]*>/g, "").trim();
  return stripped.length > 0;
};

export const useAboutSchemaValidation = () => {
  return Yup.object().shape({
    statistics: Yup.object({
      projects: Yup.string().required("Required"),
      annualSuccessActivity: Yup.string().required("Required"),
      partnership: Yup.string().required("Required"),
      ourTeam: Yup.string().required("Required"),
    }),

    texts: Yup.array()
      .of(
        Yup.object().shape({
          headline: Yup.string().required("Required"),
          content: Yup.string()
            .required("Required")
            .test(
              "html-not-empty",
              "Content must contain text",
              (value) => hasVisibleContent(value)
            ),
        })
      )
      .min(1, "At least one text is required"),
    image: Yup.mixed(),
  });
};