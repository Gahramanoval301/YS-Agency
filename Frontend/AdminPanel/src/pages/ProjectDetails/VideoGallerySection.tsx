import type { ProjectBackResProps } from '../../api/projects';
import { Image, Plus, Trash } from 'lucide-react';
import styles from "./ProjectDetails.module.css"
import TextField from '../../components/common/TextField';
import type { VideoGallerySectionValues } from '../../data/projectsFormData';
import ImageField from '../../components/common/ImageField';
import { getIn } from 'formik';

interface VideoGallerySectionProps {
    formik: any;
    projectData: ProjectBackResProps;
}

const VideoGallerySection = ({ formik }: VideoGallerySectionProps) => {

    // Add a new empty section
    const handleAddSection = () => {
        const currentSections = getIn(formik.values, "videoGallerySections") || [];
        const newSection: VideoGallerySectionValues = {
            youtubeLink: "",
            imgUrl: "",
            imgFileId: "",
        };
        // Add at the start
        formik.setFieldValue("videoGallerySections", [newSection, ...currentSections]);
    };


    const handleDeleteSection = (idx: number) => {
        const currentSections = getIn(formik.values, "videoGallerySections") || [];
        const updatedSections = currentSections.filter((_: any, index: number) => index !== idx);
        formik.setFieldValue("videoGallerySections", updatedSections);
    };

    const handleDeleteAllSection = () => {
        formik.setFieldValue("videoGallerySections", []);
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Video Gallery</h3>

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
                {formik.values.videoGallerySections.map((_: VideoGallerySectionValues, idx: number) => (
                    <div key={idx} style={{ marginBlock: "2rem" }}>
                        <div>
                            <TextField
                                formik={formik}
                                name={`videoGallerySections[${idx}].youtubeLink`}
                                placeholder="Youtube Link"
                                className="common-text-field"
                                isEdit
                            />

                            <ImageField
                                imageWrapperSpecificClassName="partners"
                                isProject
                                formik={formik}
                                name={`videoGallerySections[${idx}].imgUrl`}
                                fileIdName={`videoGallerySections[${idx}].imgFileId`}
                                label={
                                    <label htmlFor={`videoGallerySections[${idx}].imgUrl`} className="common-file-field full-width partners">
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

export default VideoGallerySection;
