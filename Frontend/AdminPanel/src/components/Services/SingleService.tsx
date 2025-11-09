import React from 'react'
import { deleteService, updateServiceData, type ServiceBackResProps } from '../../api/service'
import { useServiceSchemaValidation, type ServicesProps } from '../../data/servicesFormData';
import useFormikForm from '../../hooks/useFormikForm';
import { Trash } from 'lucide-react';
import TextField from '../common/TextField';
import ServiceListField from '../common/ServiceListField';
import toast from 'react-hot-toast';
interface SingleServiceProps {
    data: ServiceBackResProps;
    index: number;
    setReload: React.Dispatch<React.SetStateAction<number>>;
}

const SingleService = ({ data, index, setReload }: SingleServiceProps) => {

    const serviceValidation = useServiceSchemaValidation();
    const formik = useFormikForm<ServicesProps>(
        {
            title: data.title,
            includes: data.includes
        },
        serviceValidation,
        onSubmit
    );

    async function onSubmit(values: ServicesProps) {
        try {
            const resData = await updateServiceData(data.id, values);
            if (resData) {
                setReload(prev => ++prev);
                toast.success("Updated successfully!")
            } else {
                toast.error("Some error has occured!")
            }

        } catch {
            toast.error("Some error has occured!")
        }
    }

    async function handleDeleteService() {
        try {
            await deleteService(data.id);
            setReload(prev => ++prev);
            toast.success("Deleted successfully!")

        } catch {
            toast.error("Some error has occured!")

        }
    }

    return (
        <div>
            <div className='formSection' style={{ marginTop: "2rem" }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex justify-between items-center'>
                        <h3>Service #{index + 1}</h3>
                        <button onClick={handleDeleteService}>
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
        </div>
    )
}

export default SingleService
