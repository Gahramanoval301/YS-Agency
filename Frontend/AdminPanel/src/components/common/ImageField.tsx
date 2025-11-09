import { RefreshCw, Trash } from "lucide-react";
import React, {  useState, type ReactNode } from "react";
import { getIn } from "formik";
import { uploadFile } from "../../api/file-upload";
import { getImageDimensions } from "../../helpers/imageConfig";

interface ImageFieldProps {
    formik: any;
    name: string;
    label: ReactNode;
    data?: any;
    setData?: any;
    setDimensions?: any;
    imageWrapperSpecificClassName?: string;
    onFileSelect?: (file: File) => void; 
    onFileDelete?: any,
    onFileUpdate?: any;
    isProject?: boolean;
    fileIdName?: string;
}

const ImageField: React.FC<ImageFieldProps> = ({
    formik,
    name,
    label,
    setDimensions,
    data,
    setData,
    isProject,
    onFileSelect, // 👈 destructure here
    imageWrapperSpecificClassName,
    onFileDelete,
    onFileUpdate,
    fileIdName
}) => {
    const [isUpdate, setIsUpdate] = useState(false)


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("hi");

        const file = e.currentTarget.files?.[0];
        if (!file) return;

        if (isProject) {
            console.log(file);

            const resDataFile = await uploadFile(file);
            formik.setFieldValue(name, resDataFile.url || null);
            formik.setFieldValue(fileIdName, resDataFile.fileId || null);
            console.log(formik.values);



        } else {
            if (onFileUpdate && isUpdate) {
                onFileUpdate(file);

                formik.setFieldValue(name, file || null);

                if (setData) {
                    setData((prev: any) => ({
                        ...prev,
                        imageUrl: URL.createObjectURL(file),
                    }));
                }
            }
            else {

                if (setDimensions) {
                    const { width, height } = await getImageDimensions(file);
                    setDimensions({ width, height });
                }


                formik.setFieldValue(name, file || null);
                console.log(formik.values[name]);

                if (setData) {
                    setData((prev: any) => ({
                        ...prev,
                        imageUrl: URL.createObjectURL(file),
                    }));
                }


                if (onFileSelect) {
                    onFileSelect(file);
                }
            }
        }


    };

    const handleDeleteImage = async () => {
        if (onFileDelete) {
            onFileDelete();
        } else {

            formik.setFieldValue(name, null);
            if (setData) {
                setData((prev: any) => ({
                    ...prev,
                    imageUrl: null,
                }));
            }
        }


    };

    const file = getIn(formik.values, name);

    // const file = formik.values[name];
    let preview;
    console.log(formik.values);


    if (file instanceof File) {
        preview = URL.createObjectURL(file);
    } else if (typeof file === "string") {
        preview = file;
    } else if (data?.imageUrl) {
        preview = data.imageUrl;
    }

    return (
        <div style={{ marginBottom: "1rem" }}>
            {(!preview && !data?.imageUrl) && (
                <>
                    {label}
                    <input
                        id={name}
                        name={name}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}

                    />
                </>
            )}

            {(preview || data?.imageUrl) && (
                <div className={`image-wrapper ${imageWrapperSpecificClassName}`}>
                    <div className="common-image-section">
                        <img src={preview || data?.imageUrl} alt="Preview" />
                    </div>

                    <div className="controls-section">
                        <div
                            className="trash-gradient"
                            style={{ cursor: "pointer" }}
                            onClick={handleDeleteImage}
                        >
                            <Trash width={32} height={32} />
                        </div>

                        <div>
                            <label style={{ cursor: "pointer" }} htmlFor={name} onClick={() => setIsUpdate(true)}>
                                <RefreshCw color="#000" width={32} height={32} />
                            </label>
                            <input
                                id={name}
                                name={name}
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageField;
