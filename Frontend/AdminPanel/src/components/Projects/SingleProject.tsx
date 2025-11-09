import React, { useState } from 'react'
import { deleteProject, updateProjectData, type ProjectBackResProps } from '../../api/projects'
import TextField from '../common/TextField';
import MultipleSelectField from '../common/MultipleSelectField';
import ImageField from '../common/ImageField';
import { Image, PenLine, Trash } from 'lucide-react';
import styles from "./Projects.module.css"
import { useProjectBaseSchemaValidation, type ProjectBaseFormValues } from '../../data/projectsFormData';
import useFormikForm from '../../hooks/useFormikForm';
import { uploadFile } from '../../api/file-upload';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import type { IOption } from '../Blogs/BlogsSection';
interface SingleProjectProps {
    project: ProjectBackResProps;
    setReload: React.Dispatch<React.SetStateAction<number>>;
    options: any;
}

const SingleProject = ({ project, setReload, options }: SingleProjectProps) => {
    // const [dimensions, setDimensions] = useState(null);
    const [data, setData] = useState(project);
    // const [imageError, setImageError] = useState("");
    const navigate = useNavigate()


    const projectBaseSchemaValidation = useProjectBaseSchemaValidation();
    const formik = useFormikForm<ProjectBaseFormValues>(
        {
            title: data.title,
            headline: data.headline,
            image: data.imgUrl || "",
            imgFileId: data.imgFileId,
            content: data.content,
            categoryIds: data.categories?.map(cat => cat.id) || []
        },
        projectBaseSchemaValidation,
        onSubmit
    );

    async function onSubmit(values: ProjectBaseFormValues) {
        console.log(values);
        if (!values.image) {
            // setImageError("Image is required!")
        } else {
            // setImageError("")
        }
        const resDataFile = await uploadFile(values.image);

        if (resDataFile) {
            const payload = {
                ...values,
                imgUrl: resDataFile.url,
                imgFileId: resDataFile.fileId,
            };

            const resData = await updateProjectData(project.id, payload);

            if (resData) {
                setReload(prev => ++prev);
            }
        }

    }

    async function handleDelete() {
        try {

            const resData = await deleteProject(project.id);
            if (resData) {
                setReload(prev => ++prev);
                toast.success("Deleted successfully!")
            } else {
                toast.error("Some error has occured!")

            }
        } catch {

            toast.error("Some error has occured!")
        }
    }

    async function handleSingleEdit() {
        navigate(`/projects/${project.slug}`)
    }

    return (
        <div style={{ marginTop: "1.5rem" }}>

            <div className="formSection" style={{ padding: "2rem" }}>
                <div className='flex justify-between items-center' style={{ marginBottom: "1rem" }}>
                    <h3 className='font-semibold'>New Project</h3>
                    <div className='flex gap-2'>
                        <button type="button" onClick={handleSingleEdit} className='cursor-pointer'>
                            <PenLine />
                        </button>
                        <button type="button" onClick={handleDelete} className='cursor-pointer'>
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
                                fileIdName="imgFileId"
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

                            <div className="btn-wrapper" style={{ marginTop: 0, position: "absolute", right: 0, bottom: 0 }}>
                                <button type='submit' className="main-btn" style={{ marginTop: 0 }} >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingleProject
