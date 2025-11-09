import { useEffect, useState } from 'react'
import CommonLayout from '../../components/layout/CommonLayout'
import ImageField from '../../components/common/ImageField';
import useFormikForm from '../../hooks/useFormikForm';
import { partnersInitialValuesSecond, usePartnerSchemaValidation, type PartnerProps } from '../../data/partnersFormData';
import { Image } from 'lucide-react';
import { createPartnerData, getLastPartners, type PartnerBackProps } from '../../api/partner';
import SinglePartner from '../../components/Partners/SinglePartner';
import toast from 'react-hot-toast';

const Partners = () => {
  // const [isNewCreate, setIsNewCreate] = useState(false);
  const [partners, setPartners] = useState<PartnerBackProps[] | null>(null);
  const [reload, setReload] = useState(0);
  const [createData, setCreateData] = useState({
    imageUrl: ""
  });

  const fetchPartners = async () => {
    const resData = await getLastPartners();
    setPartners(resData.data);

  }
  useEffect(() => {
    fetchPartners();
  }, [reload])


  const partnerSchemaValidation = usePartnerSchemaValidation();
  const formik = useFormikForm<PartnerProps>(
    partnersInitialValuesSecond,
    partnerSchemaValidation,
    onSubmit
  );


  async function handleCreatePartner() {
    try {
      const formData = new FormData();
      if (formik.values.image) {

        formData.append("file", formik.values.image)
        const resData = await createPartnerData(formData);

        if (resData.success) {

          setPartners((prev) => [
            ...(prev || []),
            ...(Array.isArray(resData.data) ? resData.data : [resData.data]),
          ]);

          formik.setFieldValue("image", null);
          setCreateData({
            imageUrl: ""
          })
          toast.success("Created successfuly!")
          setReload((prev) => prev + 1);
        } else {
          toast.error("Some error has occured!")
        }
      }
    } catch {

      toast.error("Some error has occured!")

    }
  }
  async function onSubmit(values: PartnerProps) {
    console.log(values);
  }


  return (
    <CommonLayout>
      <div>
        <div className="headline-section">
          <h3 className="headline">Partnyorlar</h3>
          <button
            type="button"
            className="add-btn"
          // onClick={() => setIsNewCreate((prev) => !prev)}
          >
            Əlavə Et
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {
            // isNewCreate &&
            <form onSubmit={formik.handleSubmit} className="">
              <ImageField
                imageWrapperSpecificClassName="partners"
                formik={formik}
                name="image"
                data={createData}
                label={
                  <label htmlFor="image" className="common-file-field full-width partners">
                    <Image color="#ffffff66" width={32} height={32} />
                    <div>
                      <p>Click to upload</p>
                      <p>or drag and drop</p>
                    </div>
                  </label>
                }
                setData={setCreateData}
              />
              <button className='border-[0.4px] rounded-lg' style={{ padding: "8px", marginBottom: "1rem" }} onClick={handleCreatePartner}>Save</button>
            </form>
          }
          {/* other partners from  get request */}

          {partners && partners?.map(({ id, imgUrl }) => {
            return <SinglePartner key={id} id={id} imgUrl={imgUrl} setReload={setReload} setPartners={setPartners} />
          })}
        </div>

      </div>
    </CommonLayout>
  )
}

export default Partners
