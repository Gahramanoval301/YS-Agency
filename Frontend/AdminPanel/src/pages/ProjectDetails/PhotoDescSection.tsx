import type { ProjectBackResProps } from '../../api/projects';
import { Image, Trash } from 'lucide-react';
import styles from "./ProjectDetails.module.css"
import TextField from '../../components/common/TextField';
import type { PhotoDescSectionValues } from '../../data/projectsFormData';
import ImageField from '../../components/common/ImageField';
import { getIn } from 'formik';

interface PhotoDescSectionProps {
    formik: any;
    projectData: ProjectBackResProps;
}

const PhotoDescSection = ({ formik }: PhotoDescSectionProps) => {

    // Add a new empty section
    // const handleAddSection = () => {
    //     const currentSections = getIn(formik.values, "photoDescSections") || [];
    //     const newSection: PhotoDescSectionValues = {
    //         title: "",
    //         description: "",
    //         imgUrl: "",
    //         imgFileId: "",
    //     };
    //     // Add at the start
    //     formik.setFieldValue("photoDescSections", [newSection, ...currentSections]);
    // };


    const handleDeleteSection = (idx: number) => {
        const currentSections = getIn(formik.values, "photoDescSections") || [];
        const updatedSections = currentSections.filter((_: any, index: number) => index !== idx);
        formik.setFieldValue("photoDescSections", updatedSections);
    };

    const handleDeleteAllSection = () => {
        formik.setFieldValue("photoDescSections", []);
    }


    return (
        <div style={{ marginTop: "2rem" }}>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Photo + Description</h3>

                <div className='flex gap-2 items-center'>
                    {/* <button type="button" className='cursor-pointer' onClick={handleAddSection}>
                        <Plus />
                    </button> */}
                    <button type="button" className='cursor-pointer' onClick={handleDeleteAllSection}>
                        <Trash />
                    </button>
                </div>
            </div>

            {formik.values.photoDescSections.map((_: PhotoDescSectionValues, idx: number) => (
                <div key={idx} className={styles.photoDescSectionWrapper} style={{ marginBlock: "2rem", borderBottom: "1px solid #ff5cfc" }}>
                    <div>
                        <TextField
                            formik={formik}
                            name={`photoDescSections[${idx}].title`}
                            placeholder="Project name"
                            className="common-text-field"
                            isEdit
                        />
                        <TextField
                            formik={formik}
                            name={`photoDescSections[${idx}].description`}
                            placeholder="Project description"
                            className="common-text-field"
                            isEdit
                            multiline
                            rows={6}
                        />

                        <div className='btn-wrapper left-side'>
                            <button
                                type="button"
                                className='main-btn'
                                onClick={() => handleDeleteSection(idx)}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>

                    <div>
                        <ImageField
                            imageWrapperSpecificClassName="partners"
                            isProject
                            formik={formik}
                            name={`photoDescSections[${idx}].imgUrl`}
                            fileIdName={`photoDescSections[${idx}].imgFileId`}
                            label={
                                <label htmlFor={`photoDescSections[${idx}].imgUrl`} className="common-file-field full-width partners">
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
            ))}
        </div>
    )
}

export default PhotoDescSection;
