import React, { useState } from 'react'
import { projectBaseInitialValues, useProjectBaseSchemaValidation, type ProjectBaseFormValues } from '../../data/projectsFormData';
import useFormikForm from '../../hooks/useFormikForm';
import { Image, Trash } from 'lucide-react';
import styles from "./Projects.module.css"
import ImageField from '../common/ImageField';
import TextField from '../common/TextField';
import MultipleSelectField from '../common/MultipleSelectField';
import { createProjectData } from '../../api/projects';
import { uploadFile } from '../../api/file-upload';
import type { IOption } from '../Blogs/BlogsSection';

interface CreateProjectSectionProps {
    setIsNewCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setReload: React.Dispatch<React.SetStateAction<number>>;
    options: any;
}
const CreateProjectSection = ({ setIsNewCreate, setReload, options }: CreateProjectSectionProps) => {
    const [data, setData] = useState(null);
    // const [dimensions, setDimensions] = useState(null);
    const [imageError, setImageError] = useState("");

    async function onSubmit(values: ProjectBaseFormValues) {
        console.log("values of projects", values);
        if (!values.image) {
            setImageError("Image is required!")
        } else {
            setImageError("")
        }
        const resDataFile = await uploadFile(values.image);
        console.log(resDataFile);

        if (resDataFile) {
            const payload = {
                ...values,
                imgUrl: resDataFile.url,
                imgFileId: resDataFile.fileId,
            };

            const resData = await createProjectData(payload);

            if (resData) {
                setReload(prev => ++prev);
                setIsNewCreate(false);
                formik.resetForm();
            }
        }
    }


    const projectBaseSchemaValidation = useProjectBaseSchemaValidation();
    const formik = useFormikForm<ProjectBaseFormValues>(
        projectBaseInitialValues,
        projectBaseSchemaValidation,
        onSubmit
    );


    async function handleDelete() {
        setIsNewCreate(false);
        formik.resetForm();
    }
    // console.log(formik.values);


    return (
        <div className='formSection' style={{ marginTop: "2rem", padding: "2rem" }}>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold'>New Project</h3>
                <div className='flex gap-2'>
                    <button type="button" onClick={handleDelete}>
                        <Trash />
                    </button>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} style={{ position: "relative" }}>
                <div className={styles.gridContentWrapper}>
                    <div>

                        <label htmlFor="title" className='common-label'>Project name</label>
                        <TextField
                            formik={formik}
                            name="title"
                            placeholder="Project name"
                            className="common-text-field"
                            isEdit
                        />
                        <label htmlFor="content" className='common-label'>Subtext</label>
                        <TextField
                            formik={formik}
                            name="content"
                            placeholder="Subtext"
                            className="common-text-field"
                            isEdit
                        />
                        <label htmlFor="headline" className='common-label'>Headline</label>
                        <TextField
                            formik={formik}
                            name="headline"
                            placeholder="Subtext"
                            className="common-text-field"
                            isEdit
                        />

                        <label htmlFor="categoryIds" className='common-label' style={{ marginBottom: "0px !important" }}>Kateqoriyalar</label>

                        <div style={{ marginTop: "-20px" }}>
                            <MultipleSelectField
                                formik={formik}
                                name="categoryIds"
                                options={options?.map((cat:IOption) => ({
                                    value: cat.id,
                                    label: cat.title
                                })) || []}
                                placeholder="Categories"
                            />
                        </div>

                    </div>
                    <div style={{ paddingBottom: "3rem" }}>
                        <ImageField
                            imageWrapperSpecificClassName="partners"

                            data={data}
                            setData={setData}
                            formik={formik}
                            name="image"
                            // setDimensions={setDimensions}
                            label={
                                <label htmlFor="image" className="common-file-field full-width partners">
                                    <Image color="#ffffff66" width={32} height={32} />
                                    <div>
                                        <p>Click to upload</p>
                                        <p>or drag and drop</p>
                                    </div>
                                </label>
                            }
                        />
                        {imageError && <div className={`common-error-style`}  >{imageError}</div>}

                        <div className="btn-wrapper" style={{ marginTop: 0, position: "absolute", right: 0, bottom: 0 }}>
                            <button type='submit' className="main-btn" style={{ marginTop: 0 }} >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default CreateProjectSection
