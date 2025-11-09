import { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout'
import { useStudioSchemaValidation, type StudioFormValues } from '../../data/studioFormData';
import { createOrUpdateStudioData, getStudioData } from '../../api/studio';
import useFormikForm from '../../hooks/useFormikForm';
import TextField from '../../components/common/TextField';
import RichTextField from '../../components/common/RichTextField';
import StudioImagesSection from '../../components/Studio/StudioImagesSection';
import toast from 'react-hot-toast';


const Studio = () => {
  const [studioData, setStudioData] = useState<StudioFormValues | null>(null);

  const contactSchemaValidation = useStudioSchemaValidation();

  async function onSubmit(values: StudioFormValues) {
    try {
      const res = await createOrUpdateStudioData(values);
      if (res) {
        toast.success("Updated successfully!")
      }
      else {
        toast.error("Some error has occured!")
      }
    } catch {

      toast.error("Some error has occured!")
    }
  }

  const formik = useFormikForm<StudioFormValues>(
    {
      headline: studioData?.headline ?? "",
      content: studioData?.content ?? "",
      images: studioData?.images ?? [
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },

        { imgUrl: "", imgFileId: "" },
      ],
    },
    contactSchemaValidation,
    onSubmit,
    true
  );

  async function fetchData() {
    const resStudioData = await getStudioData();
    if (resStudioData) {
      setStudioData(resStudioData.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <CommonLayout sectionTitle='Studio'>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className='formSection' style={{ padding: "2rem" }}>
          <TextField
            formik={formik}
            name="headline"
            placeholder="Headline"
            className="common-text-field"
            isEdit
          />

          <RichTextField
            name="content"
            value={formik.values.content}
            placeholder="Blog text"
            isEdit
            onChange={(val) => formik.setFieldValue("content", val)}
          />


          <StudioImagesSection formik={formik} />


          <div className="btn-wrapper" style={{ marginTop: 0 }}>
            <button className="main-btn" style={{ marginTop: 0 }} >
              Save
            </button>
          </div>
        </div>
      </form>
    </CommonLayout>
  )
}

export default Studio
