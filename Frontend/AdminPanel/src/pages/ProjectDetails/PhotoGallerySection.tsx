import type { ProjectBackResProps } from '../../api/projects';
import { Image, Plus, Trash } from 'lucide-react';
import styles from "./ProjectDetails.module.css"
import TextField from '../../components/common/TextField';
import type { PhotoGallerySectionValues } from '../../data/projectsFormData';
import ImageField from '../../components/common/ImageField';
import { getIn } from 'formik';

interface PhotoGallerySectionProps {
    formik: any;
    projectData: ProjectBackResProps;
}

const PhotoGallerySection = ({ formik }: PhotoGallerySectionProps) => {

    // Add a new empty section
    const handleAddSection = () => {
        const currentSections = getIn(formik.values, "photoGallerySections") || [];
        const newSection: PhotoGallerySectionValues = {
            title: "",
            imgUrl: "",
            imgFileId: "",
        };
        // Add at the start
        formik.setFieldValue("photoGallerySections", [newSection, ...currentSections]);
    };


    const handleDeleteSection = (idx: number) => {
        const currentSections = getIn(formik.values, "photoGallerySections") || [];
        const updatedSections = currentSections.filter((_: any, index: number) => index !== idx);
        formik.setFieldValue("photoGallerySections", updatedSections);
    };

    const handleDeleteAllSection = () => {
        formik.setFieldValue("photoGallerySections", []);
    }


    return (
        <div style={{ marginTop: "2rem" }}>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Photo Gallery</h3>

                <div className='flex gap-2 items-center'>
                    <button type="button" className='cursor-pointer' onClick={handleAddSection}>
                        <Plus />
                    </button>
                    <button type="button" className='cursor-pointer' onClick={handleDeleteAllSection}>
                        <Trash />
                    </button>
                </div>
            </div>

            <div className={styles.gallerySectionWrapper}>
                {formik.values.photoGallerySections.map((_: PhotoGallerySectionValues, idx: number) => (
                    <div key={idx} style={{ marginBlock: "2rem" }}>
                        <div>
                            <TextField
                                formik={formik}
                                name={`photoGallerySections[${idx}].title`}
                                placeholder="Title"
                                className="common-text-field"
                                isEdit
                            />

                            <ImageField
                                imageWrapperSpecificClassName="partners"
                                isProject
                                formik={formik}
                                name={`photoGallerySections[${idx}].imgUrl`}
                                fileIdName={`photoGallerySections[${idx}].imgFileId`}
                                label={
                                    <label htmlFor={`photoGallerySections[${idx}].imgUrl`} className="common-file-field full-width partners">
                                        <Image color="#ffffff66" width={32} height={32} />
                                        <div>
                                            <p>Click to upload</p>
                                            <p>or drag and drop</p>
                                        </div>
                                    </label>
                                }
                            />

                            <div className='btn-wrapper left-side' style={{ marginBottom: "1rem" }}>
                                <button
                                    type="button"
                                    className='main-btn'
                                    onClick={() => handleDeleteSection(idx)}
                                >
                                    <Trash />
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default PhotoGallerySection;
