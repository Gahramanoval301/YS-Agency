import { useEffect, useState } from 'react'
import { createProjectData, getSingleProject, updateProjectData, type ProjectBackResProps } from '../../api/projects'
import { useNavigate, useParams } from 'react-router';
import { getCategories } from '../../api/blog';
import { useProjectSchemaValidation, type ProjectFormValues } from '../../data/projectsFormData';
import useFormikForm from '../../hooks/useFormikForm';
import { Check, Image } from 'lucide-react';
import styles from "./ProjectDetails.module.css"
import ImageField from '../../components/common/ImageField';
import TextField from '../../components/common/TextField';
import MultipleSelectField from '../../components/common/MultipleSelectField';
import PhotoDescSection from './PhotoDescSection';
import VideoDescSection from './VideoDescSection';
import PhotoGallerySection from './PhotoGallerySection';
import VideoGallerySection from './VideoGallerySection';
import toast from 'react-hot-toast';
import type { IOption } from '../../components/Blogs/BlogsSection';

const ProjectDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const [projectData, setProjectData] = useState<ProjectBackResProps | null>(null);
    const [options, setOptions] = useState<any>(null);
    // const [imageError, setImageError] = useState("");
    const navigate = useNavigate()

    const projectSchemaValidation = useProjectSchemaValidation();
    const initialValues = projectData ? {
        title: projectData.title,
        headline: projectData.headline,
        imgUrl: projectData.imgUrl || "",
        imgFileId: projectData.imgFileId || "",
        content: projectData.content,
        categoryIds: projectData.categories?.map(cat => cat.id) || [],
        sectionImages: projectData.sectionImages || [
            { imgUrl: "", imgFileId: "" },
            { imgUrl: "", imgFileId: "" },
        ],
        photoDescSections: projectData.photoDescSections?.map(section => ({
            title: section.title || "",
            description: section.description || "",
            imgUrl: section.imgUrl || "",
            imgFileId: section.imgFileId || "",
        })) || [],
        videoDescSections: projectData.videoDescSections?.map(section => ({
            title: section.title || "",
            description: section.description || "",
            youtubeLink: section.youtubeLink || "",
            imgUrl: section.imgUrl || "",
            imgFileId: section.imgFileId || "",
        })) || [],
        photoGallerySections: projectData.photoGallerySections?.map(section => ({
            title: section.title || "",
            imgUrl: section.imgUrl || "",
            imgFileId: section.imgFileId || "",
        })) || [],
        videoGallerySections: projectData.videoGallerySections?.map(section => ({
            youtubeLink: section.youtubeLink || "",
            imgUrl: section.imgUrl || "",
            imgFileId: section.imgFileId || "",
        })) || [],

    } : {
        title: "",
        headline: "",
        imgUrl: "",
        imgFileId: "",
        content: "",
        categoryIds: [],
        sectionImages: [
            { imgUrl: "", imgFileId: "" },
            { imgUrl: "", imgFileId: "" },
        ],
        photoDescSections: [],
        videoDescSections: [],
        photoGallerySections: [],
        videoGallerySections: [],
    };


    const formik = useFormikForm<ProjectFormValues>(
        initialValues,
        projectSchemaValidation,
        onSubmit,
        true
    );

    async function onSubmit(values: ProjectFormValues) {
        try {

            if (projectData && projectData.title) {
                await updateProjectData(projectData.id, values);
                navigate("/projects")
                toast.success("Updated successfully!")
            } else {
                await createProjectData(values);
                toast.success("Created successfully!")
                navigate("/projects")
            }
        } catch {
            toast.error("Some error has occured!")
        }
    }


    async function fetchSingleProject() {
        const resData = await getSingleProject(slug || "");
        const resCategories = await getCategories(1, 100);

        setOptions(resCategories.data);
        setProjectData(resData);
    }

    useEffect(() => {
        fetchSingleProject();
    }, [])

    return (
        <div className='' style={{ padding: "2rem" }}>
            <div className='formSection' style={{ padding: "2rem" }}>

                <form action="" onSubmit={formik.handleSubmit}>

                    <div className='flex justify-between items-center'>
                        <h3 className='font-semibold text-xl'>Project Edit</h3>

                        <div className='flex gap-2 items-center'>
                            <button type="submit" className='cursor-pointer'>
                                <Check />
                            </button>
                            {/* <button type="button" onClick={handleDelete} className='cursor-pointer'>
                                <Trash />
                            </button> */}
                        </div>
                    </div>

                    <div className={styles.gridImgSectionWrapper}>
                        <div>
                            <ImageField
                                isProject
                                imageWrapperSpecificClassName="partners"
                                data={projectData}
                                setData={setProjectData}
                                formik={formik}
                                name="imgUrl"
                                // setDimensions={setDimensions}
                                label={
                                    <label htmlFor="imgUrl" className="common-file-field full-width partners">
                                        <Image color="#ffffff66" width={32} height={32} />
                                        <div>
                                            <p>Click to upload</p>
                                            <p>or drag and drop</p>
                                        </div>
                                    </label>
                                }
                            />

                        </div>
                        <div>
                            <label htmlFor="title" className='common-label'>Project name</label>
                            <TextField
                                formik={formik}
                                name="title"
                                placeholder="Project name"
                                className="common-text-field"
                                isEdit
                            />
                            <label htmlFor="headline" className='common-label'>Headline</label>
                            <TextField
                                formik={formik}
                                name="headline"
                                placeholder="Headline"
                                className="common-text-field"
                                isEdit
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <ImageField
                                isProject
                                imageWrapperSpecificClassName="partners"
                                setData={setProjectData}
                                formik={formik}
                                name="sectionImages[0].imgUrl"
                                fileIdName="sectionImages[0].imgFileId"
                                label={
                                    <label htmlFor="imgUrl" className="common-file-field full-width partners">
                                        <Image color="#ffffff66" width={32} height={32} />
                                        <div>
                                            <p>Click to upload</p>
                                            <p>or drag and drop</p>
                                        </div>
                                    </label>
                                }
                            />
                        </div>
                        <div>
                            <ImageField
                                isProject
                                imageWrapperSpecificClassName="partners"
                                data={projectData}
                                setData={setProjectData}
                                formik={formik}
                                name="sectionImages[1].imgUrl"
                                fileIdName="sectionImages[1].imgFileId"
                                label={
                                    <label htmlFor="imgUrl" className="common-file-field full-width partners">
                                        <Image color="#ffffff66" width={32} height={32} />
                                        <div>
                                            <p>Click to upload</p>
                                            <p>or drag and drop</p>
                                        </div>
                                    </label>
                                }
                            />
                        </div>

                    </div>
                    <div>
                        <label htmlFor="content" className='common-label'>Subtext</label>
                        <TextField
                            formik={formik}
                            name="content"
                            placeholder="Subtext"
                            className="common-text-field"
                            isEdit
                            multiline rows={5}
                        />

                        <label htmlFor="categoryIds" className='common-label' style={{ marginBottom: "0px !important" }}>Kateqoriya</label>
                        <div style={{ marginTop: "-20px" }}>
                            <MultipleSelectField
                                formik={formik}
                                name="categoryIds"
                                options={options?.map((cat: IOption) => ({
                                    value: cat.id,
                                    label: cat.title
                                })) || []}
                                placeholder="Categories"
                            />
                        </div>
                    </div>
                    {
                        projectData &&
                        <>
                            <PhotoDescSection formik={formik} projectData={projectData} />
                            <VideoDescSection formik={formik} projectData={projectData} />
                            <PhotoGallerySection formik={formik} projectData={projectData} />
                            <VideoGallerySection formik={formik} projectData={projectData} />
                        </>
                    }
                </form>
            </div>
        </div>
    )
}

export default ProjectDetails
