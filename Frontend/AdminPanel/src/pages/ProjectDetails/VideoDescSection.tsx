import type { ProjectBackResProps } from '../../api/projects';
import { Image, Plus, Trash } from 'lucide-react';
import styles from "./ProjectDetails.module.css"
import TextField from '../../components/common/TextField';
import type { VideoDescSectionValues } from '../../data/projectsFormData';
import ImageField from '../../components/common/ImageField';
import { getIn } from 'formik';

interface VideoDescSectionProps {
    formik: any;
    projectData: ProjectBackResProps;
}

const VideoDescSection = ({ formik }: VideoDescSectionProps) => {

  const handleAddSection = () => {
    const currentSections = getIn(formik.values, "videoDescSections") || [];
    const newSection: VideoDescSectionValues = {
        title: "",
        description: "",
        youtubeLink: "",
        imgUrl: "",
        imgFileId: "",
    };
    formik.setFieldValue("videoDescSections", [newSection, ...currentSections]);
};


    // Delete section by index
    const handleDeleteSection = (idx: number) => {
        const currentSections = getIn(formik.values, "videoDescSections") || [];
        const updatedSections = currentSections.filter((_: any, index: number) => index !== idx);
        formik.setFieldValue("videoDescSections", updatedSections);
    };

    const handleDeleteAllSection = () => {
        formik.setFieldValue("videoDescSections", []);
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Video + Description</h3>

                <div className='flex gap-2 items-center'>
                    <button type="button" className='cursor-pointer' onClick={handleAddSection}>
                        <Plus />
                    </button>
                    <button type="button" className='cursor-pointer' onClick={handleDeleteAllSection}>
                        <Trash />
                    </button>
                </div>
            </div>

            {formik.values.videoDescSections.map((_: VideoDescSectionValues, idx: number) => (
                <div key={idx} className={styles.photoDescSectionWrapper} style={{ marginBlock: "2rem", borderBottom: "1px solid #ff5cfc" }}>
                    <div>
                        <TextField
                            formik={formik}
                            name={`videoDescSections[${idx}].title`}
                            placeholder="Video title"
                            className="common-text-field"
                            isEdit
                        />
                        <TextField
                            formik={formik}
                            name={`videoDescSections[${idx}].youtubeLink`}
                            placeholder="Youtube Link"
                            className="common-text-field"
                            isEdit
                        />
                        <TextField
                            formik={formik}
                            name={`videoDescSections[${idx}].description`}
                            placeholder="Video description"
                            className="common-text-field"
                            isEdit
                            multiline
                            rows={6}
                        />

                        <div className='btn-wrapper left-side' style={{ marginBottom: "2rem" }}>
                            <button
                                type="button"
                                className='main-btn'
                                onClick={() => handleDeleteSection(idx)}
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>

                    <div>
                        <ImageField
                            isProject
                            formik={formik}
                            imageWrapperSpecificClassName="partners"
                            name={`videoDescSections[${idx}].imgUrl`}
                            fileIdName={`videoDescSections[${idx}].imgFileId`}
                            label={
                                <label htmlFor={`videoDescSections[${idx}].imgUrl`} className="common-file-field full-width partners">
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

export default VideoDescSection;
