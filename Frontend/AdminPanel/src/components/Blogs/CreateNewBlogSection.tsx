import { useState } from 'react'
import { useBlogSchemaValidation, type BlogFormValues } from '../../data/blogFormData';
import { createBlogData } from '../../api/blog';
import useFormikForm from '../../hooks/useFormikForm';
import styles from "./Blogs.module.css"
import TextField from '../common/TextField';
import RichTextField from '../common/RichTextField';
import MultipleSelectField from '../common/MultipleSelectField';
import HashtagField from '../common/TagSelectField';
import ImageField from '../common/ImageField';
import { Image } from 'lucide-react';
import toast from 'react-hot-toast';
import type { IOption } from './BlogsSection';

interface NewBlogSectionProps {
    reloadBlogs: any;
    setIsNewCreate: React.Dispatch<React.SetStateAction<boolean>>;
    options: IOption[];

}

const CreateNewBlogSection = ({ reloadBlogs, options, setIsNewCreate }: NewBlogSectionProps) => {
    // const [dimensions, setDimensions] = useState(null);
    const [data, setData] = useState(null);

    const blogSchemaValidation = useBlogSchemaValidation();

    const onSubmit = async (values: BlogFormValues) => {
        try {
            const formData = new FormData();

            for (const key in values) {
                if (key === "image") continue; 
                const typedKey = key as keyof BlogFormValues;
                const value = values[typedKey];

                if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            }

            // Append file if available
            if (values.image instanceof File) {
                formData.append("file", values.image);
            }

            const res = await createBlogData(formData);
            if (res) {
                toast.error("Created successfully!")
            } else {
                toast.error("Some error has occured!")
            }
            formik.resetForm();
            setIsNewCreate(false);
            reloadBlogs();
        }
        catch {
            toast.error("Some error has occured!")
        }
    };


    const formik = useFormikForm<BlogFormValues>(
        {
            blogTitle: "",
            blogContent: "",
            blogCategories: [],
            blogTags: [],
            image: null,
        },
        blogSchemaValidation,
        onSubmit
    );

    return (
        <form onSubmit={formik.handleSubmit} className={styles.blogContainer}>
            <div className={styles.headerSection} >
                <h3 className="text-xl font-semibold">New Blog:</h3>
            </div>

            <div className={styles.formWrapper}>
                <div>
                    <TextField
                        formik={formik}
                        name="blogTitle"
                        placeholder="Blog name"
                        className="common-text-field"
                        isEdit
                    />

                    <RichTextField
                        name="blogContent"
                        value={formik.values.blogContent}
                        placeholder="Blog text"
                        isEdit
                        onChange={(val) => formik.setFieldValue("blogContent", val)}
                    />

                    <MultipleSelectField
                        formik={formik}
                        name="blogCategories"
                        options={options?.map(cat => ({
                            value: cat.id,
                            label: cat.title
                        })) || []}
                        placeholder="Categories"
                    />

                    <HashtagField formik={formik} name="blogTags" placeholder="Add hashtags..." />

                </div>
                <div>
                    <ImageField
                        data={data}
                        setData={setData}
                        formik={formik}
                        name="image"
                        // setDimensions={setDimensions}
                        label={
                            <label htmlFor="image" className="common-file-field full-width">
                                <Image color="#ffffff66" width={32} height={32} />
                                <div>
                                    <p>Click to upload</p>
                                    <p>or drag and drop</p>
                                </div>
                            </label>
                        }
                    />
                    <div className="btn-wrapper" style={{ marginTop: 0 }}>
                        <button className="main-btn" style={{ marginTop: 0 }} >
                            Save
                        </button>
                    </div>
                </div>
            </div>


        </form>
    );
};
export default CreateNewBlogSection
