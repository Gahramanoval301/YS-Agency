import React, { useState } from 'react'
import ImageField from '../common/ImageField';
import { usePartnerSchemaValidation, type PartnerProps } from '../../data/partnersFormData';
import useFormikForm from '../../hooks/useFormikForm';
import { Image } from 'lucide-react';
import { deletePartner, updatePartnerData, type PartnerBackProps } from '../../api/partner';
import toast from 'react-hot-toast';

interface SinglePartnerProps {
    id: string;
    imgUrl: string;
    setReload: React.Dispatch<React.SetStateAction<number>>;
    setPartners: React.Dispatch<React.SetStateAction<PartnerBackProps[] | null>>;
}

const SinglePartner = ({ id, imgUrl, setReload, setPartners }: SinglePartnerProps) => {

    const [data, setData] = useState({
        imgUrl
    });

    const partnerSchemaValidation = usePartnerSchemaValidation();
    const formik = useFormikForm<PartnerProps>(
        {
            imageUrl: imgUrl || null
        },
        partnerSchemaValidation,
        onSubmit
    );

    async function onSubmit() {

    }

    const onFileUpdate = async (file: File) => {
        try {
            if (id) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await updatePartnerData(id, formData);
                if (res) {
                    toast.success("Updated successfully!")
                } else {
                    toast.error("Some error has occured!")
                }
                setReload(prev => ++prev);
            }
        } catch {
            toast.error("Some error has occured!")
        }
    }

    const onFileDelete = async () => {
        if (id) {
            await deletePartner(id);
            setPartners((prev) => prev && prev.filter((partner) => partner.id !== id));


        }
    }

    return (
        <div key={id}>
            <ImageField
                imageWrapperSpecificClassName="partners"
                formik={formik}
                name="imageUrl"
                data={data}
                label={
                    <label htmlFor="image" className="common-file-field full-width partners">
                        <Image color="#ffffff66" width={32} height={32} />
                        <div>
                            <p>Click to upload</p>
                            <p>or drag and drop</p>
                        </div>
                    </label>
                }
                onFileUpdate={onFileUpdate}
                onFileDelete={onFileDelete}
                setData={setData}
            // onFileSelect={async (file) => {
            //     try {
            //         console.log(file);

            //         await formik.setFieldValue("image", file);

            //         const formData = new FormData();
            //         formData.append("file", file);

            //         const response = await createPartnerData(formData);

            //         if (response) {
            //             setReload(prev => ++prev);
            //         }

            //     } catch (error) {
            //         console.error("Failed to create partner:", error);
            //     }
            // }}

            />
        </div>
    )
}

export default SinglePartner
