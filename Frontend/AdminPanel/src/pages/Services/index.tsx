import { useEffect, useState } from 'react'
import CommonLayout from '../../components/layout/CommonLayout'
import { Trash } from 'lucide-react'
import useFormikForm from '../../hooks/useFormikForm'
import { serviceInitialValues, useServiceSchemaValidation, type ServicesProps } from '../../data/servicesFormData'
import TextField from '../../components/common/TextField'
import ServiceListField from '../../components/common/ServiceListField'
import { createServiceData, getAllServices, type ServiceBackResProps } from '../../api/service'
import SingleService from '../../components/Services/SingleService'
import toast from 'react-hot-toast'

const Services = () => {
  const [isNewCreate, setIsNewCreate] = useState(false)
  const [reload, setReload] = useState(0)
  const [services, setServices] = useState<ServiceBackResProps[] | null>(null);

  const serviceValidation = useServiceSchemaValidation();
  const formik = useFormikForm<ServicesProps>(
    serviceInitialValues,
    serviceValidation,
    onSubmit
  );

  async function fetchServices() {
    const resData = await getAllServices();
    setServices(resData)
  }

  useEffect(() => {
    fetchServices();
  }, [reload])


  async function onSubmit(values: ServicesProps) {
    try {
      const resData = await createServiceData(values);
      if (resData) {
        setIsNewCreate(false);
        formik.resetForm();
        setReload(prev => ++prev);
        toast.success("Created successfully!")
      } else {
        toast.error("Some error has occured!")
      }

    } catch {
      toast.error("Some error has occured!")
    }
  }

  function handleDeleteCreation() {
    setIsNewCreate(false);
    formik.resetForm();
  }

  return (
    <CommonLayout >
      <div>
        <div className="headline-section">
          <h3 className="headline">Partnyorlar</h3>
          <button
            type="button"
            className="add-btn"
            onClick={() => setIsNewCreate((prev) => !prev)}
          >
            Əlavə Et
          </button>
        </div>

        {isNewCreate &&
          <div className='formSection'>
            <form onSubmit={formik.handleSubmit}>
              <div className='flex justify-between items-center'>
                <h3>New Service</h3>
                <button onClick={handleDeleteCreation}>
                  <Trash />
                </button>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="title" className='common-label'>Service name</label>
                <TextField
                  formik={formik}
                  name="title"
                  placeholder="Service name"
                  className="common-text-field"
                  isEdit
                />
                <label htmlFor="title" className='common-label'>What included</label>
                <ServiceListField formik={formik} name="includes" />



              </div>
              <div className="btn-wrapper" style={{ marginTop: "1.5rem" }}>
                <button className="main-btn" style={{ marginTop: 0, display: "block" }} >
                  Save
                </button>
              </div>
            </form>
          </div>
        }

        <div>
          <h3 className='text-2xl font-semibold' style={{ marginTop: "2rem" }}>Full Services</h3>

          {services && services.map((service: ServiceBackResProps, index: number) =>
            <SingleService key={service.id} data={service} index={index} setReload={setReload} />
          )}
        </div>
      </div>
    </CommonLayout>
  )
}

export default Services
