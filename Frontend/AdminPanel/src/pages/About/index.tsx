import CommonLayout from "../../components/layout/CommonLayout";
import { aboutInitialValues, useAboutSchemaValidation, type AboutFormValues } from "../../data/aboutFormData";
import useFormikForm from "../../hooks/useFormikForm";
import "../../assets/styles/forms.css"
import TextField from "../../components/common/TextField";
import ImageField from "../../components/common/ImageField";
import { Image, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import RichTextField from "../../components/common/RichTextField";
import { getAboutData, updateAboutData } from "../../api/about";

const About = () => {
  const [data, setData] = useState(null);

  const [editStatistics, setEditStatistics] = useState({
    isStatisticsEdit: false,
    isTextFirstEdit: false,
    isTextSecondEdit: false,
    isImageEdit: false,
  });

  const aboutSchemaValidation = useAboutSchemaValidation();
  const formik = useFormikForm<AboutFormValues>(
    aboutInitialValues,
    aboutSchemaValidation,
    onSubmit
  );
  const [dimensions, setDimensions] = useState(null);

  console.log("formik", formik.values);

  function onSubmit(values: AboutFormValues) {
    return;
    // console.log("Full form submit:", values);
  }
  async function handlePartialSubmit(section: "statistics" | "text1" | "text2" | "image") {
    try {
      let validationPath;
      let valuesToValidate;

      switch (section) {
        case "statistics":
          validationPath = "statistics";
          valuesToValidate = formik.values.statistics;

          const formData = new FormData();

          // ✅ Correct way: stringify object
          formData.append("statistics", JSON.stringify(formik.values.statistics));

          const res = await updateAboutData(formData);
          console.log(res);



          break;
        case "text1":
          validationPath = "texts[0]";
          valuesToValidate = formik.values.texts[0];

          const formDataFirstText = new FormData();

          // ✅ Correct way: stringify object
          formDataFirstText.append("texts", JSON.stringify(formik.values.texts));
          const resDataFirst = await updateAboutData(formDataFirstText);
          console.log(resDataFirst);

          break;
        case "text2":
          validationPath = "texts[1]";
          valuesToValidate = formik.values.texts[1];
          const formDataSecondText = new FormData();

          // ✅ Correct way: stringify object
          formDataSecondText.append("texts", JSON.stringify(formik.values.texts));
          const resDataSecond = await updateAboutData(formDataSecondText);
          console.log(resDataSecond);

          break;
        case "image":
          validationPath = "image";
          valuesToValidate = formik.values.image;

          const formDataImg = new FormData();

          // ✅ Correct way: stringify object
          console.log("IMG: ",formik.values.image);

          formDataImg.append("file", formik.values.image);
          const resDataImg = await updateAboutData(formDataImg);
          console.log(resDataImg);

          break;
        default:
          return;
      }

      await aboutSchemaValidation.validateAt(validationPath, formik.values, {
        abortEarly: false,
      });

      console.log(`✅ ${section} valid:`, valuesToValidate);

      formik.setErrors({}); // clear old errors
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((validationErr: any) => {
          if (validationErr.path && !newErrors[validationErr.path]) {
            newErrors[validationErr.path] = validationErr.message;
          }
        });

        formik.setErrors(newErrors);
        console.warn("❌ Validation failed for section:", section, newErrors);
      } else {
        console.error("Unexpected validation error:", err);
      }
    }
  }
  console.log(formik.errors);


  const fetchAboutData = async () => {
    const resData = await getAboutData();
    console.log(resData);
    formik.setValues({
      ...resData.data,          // other fields
      image: resData.imageUrl,  // set the file field separately
    });

    setData(resData.data)
  }

  useEffect(() => {
    fetchAboutData();
  }, [])

  console.log(data);

  return (
    <CommonLayout sectionTitle="About">
      <form onSubmit={formik.handleSubmit}>

        {/* statistics */}
        <div className="formSection">
          <div className="headline-section">
            <h3 className="headline">Statistika</h3>

            <button type="button" onClick={() => setEditStatistics((prev) => {
              return { ...prev, isStatisticsEdit: !prev.isStatisticsEdit }
            })}>
              <SquarePen />
            </button>
          </div>

          <div className="statistics-container-wrapper">
            <div>
              <p className="small-headline">Layihələrimiz</p>
              <div className="text-field-small-wrapper" >
                <TextField errorAbsoluteStyle formik={formik} isEdit={editStatistics.isStatisticsEdit} name="statistics.projects" placeholder="+200" className="small-centerized-text-field" />
              </div>
            </div>
            <div>
              <p className="small-headline">İllərlə uğurlu fəaliyyət</p>
              <div className="text-field-small-wrapper" >
                <TextField errorAbsoluteStyle formik={formik} isEdit={editStatistics.isStatisticsEdit} name="statistics.annualSuccessActivity" placeholder="+4" className="small-centerized-text-field" />
              </div>
            </div>
            <div>
              <p className="small-headline">Layihələrimiz</p>
              <div className="text-field-small-wrapper" >
                <TextField errorAbsoluteStyle formik={formik} isEdit={editStatistics.isStatisticsEdit} name="statistics.partnership" placeholder="+150" className="small-centerized-text-field" />
              </div>
            </div>
            <div>
              <p className="small-headline">Layihələrimiz</p>
              <div className="text-field-small-wrapper" >
                <TextField errorAbsoluteStyle formik={formik} isEdit={editStatistics.isStatisticsEdit} name="statistics.ourTeam" placeholder="+9" className="small-centerized-text-field" />
              </div>
            </div>

          </div>

          {
            editStatistics.isStatisticsEdit && <div className="btn-wrapper">
              <button type="button" className="main-btn" onClick={() => handlePartialSubmit("statistics")}>Save</button>
            </div>
          }
        </div>

        {/* Text 1 Action  */}
        <div className="formSection" style={{ marginBlock: "2rem" }}>
          <div className="headline-section">
            <h3 className="headline">Text #1</h3>

            <button onClick={() => setEditStatistics((prev) => {
              return { ...prev, isTextFirstEdit: !prev.isTextFirstEdit }
            })}>
              <SquarePen />
            </button>
          </div>

          <p className="small-headline" style={{ marginBottom: "4px" }}>Heading</p>
          <TextField formik={formik} name="texts[0].headline" placeholder="Add Heading" className="common-text-field purple-text-field" isEdit={editStatistics.isTextFirstEdit} />


          <p className="small-headline" style={{ marginBottom: "4px", marginTop: "1rem" }}>Text</p>

          <RichTextField
            name="texts[0].content"
            value={formik.values.texts[0].content}
            placeholder="Add Text"
            isEdit={editStatistics.isTextFirstEdit}
            onChange={(val) => formik.setFieldValue("texts[0].content", val)}
          />


          {
            editStatistics.isTextFirstEdit && <div className="btn-wrapper">
              <button type="button" className="main-btn" onClick={() => handlePartialSubmit("text1")}>Save</button>
            </div>
          }
          {/* <TextField formik={formik} name="texts[0].content" placeholder="Add Text" className="common-text-field" isEdit={editStatistics.isTextFirstEdit} multiline rows={10} /> */}
        </div>


        {/* Text 2 Action  */}
        <div className="formSection" style={{ marginBlock: "2rem" }}>
          <div className="headline-section">
            <h3 className="headline">Text #2</h3>

            <button onClick={() => setEditStatistics((prev) => {
              return { ...prev, isTextSecondEdit: !prev.isTextSecondEdit }
            })}>
              <SquarePen />
            </button>
          </div>

          <p className="small-headline" style={{ marginBottom: "4px" }}>Heading</p>
          <TextField formik={formik} name="texts[1].headline" placeholder="Add Heading" className="common-text-field purple-text-field" isEdit={editStatistics.isTextFirstEdit} />


          <p className="small-headline" style={{ marginBottom: "4px", marginTop: "1rem" }}>Text</p>

          <RichTextField
            name="texts[1].content"
            value={formik.values.texts[1].content}
            placeholder="Add Text"
            isEdit={editStatistics.isTextSecondEdit}
            onChange={(val) => formik.setFieldValue("texts[1].content", val)}
          />


          {
            editStatistics.isTextSecondEdit && <div className="btn-wrapper">
              <button type="button" onClick={() => handlePartialSubmit("text2")} className="main-btn">Save</button>
            </div>
          }
          {/* <TextField formik={formik} name="texts[0].content" placeholder="Add Text" className="common-text-field" isEdit={editStatistics.isTextFirstEdit} multiline rows={10} /> */}
        </div>

        <div className="formSection" style={{ marginBlock: "2rem" }}>
          <div className="headline-section">
            <h3 className="headline">Image</h3>

            {dimensions && (
              <p>
                {dimensions.width} x {dimensions.height} px
              </p>
            )}

          </div>


          <ImageField
            data={data}
            setData={setData}
            formik={formik}
            name="image"
            setDimensions={setDimensions}
            label={
              <label
                htmlFor={"image"}
                className="common-file-field"
              >
                <Image color="#ffffff66" width={32} height={32} />

                <div>
                  <p>
                    Click to upload
                  </p>
                  <p>
                    or drag and drop
                  </p>

                </div>
              </label>
            }
          />

          <div className="btn-wrapper left-side">
            <button onClick={() => handlePartialSubmit("image")} type="button" className="main-btn">Save</button>
          </div>
        </div>
      </form>

    </CommonLayout>
  )
}

export default About
