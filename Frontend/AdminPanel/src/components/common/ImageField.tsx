import { Image, RefreshCw, Trash } from "lucide-react";
import React, { type ReactNode } from "react";
import { getImageDimensions } from "../../helpers/imageConfig"

interface ImageFieldProps {
    formik: any;
    name: string;
    label?: ReactNode;
    setDimensions?: any;
}

const ImageField: React.FC<ImageFieldProps> = ({ formik, name, label, setDimensions, data, setData }) => {
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];

        const { width, height } = await getImageDimensions(file);
        setDimensions({ width, height });

        formik.setFieldValue(name, file || null);
    };

    const handleDeleteImage = async () => {
        formik.setFieldValue(name, null);
        setData((prev) => ({
            ...prev,       // spread the previous state
            imageUrl: null // overwrite imageUrl
        }));

    };
    console.log(formik.values.imageUrl);

    const file = formik.values[name];
    let preview;

    if (file instanceof File) {
        preview = URL.createObjectURL(file);
    } else if (typeof file === "string") {
        // If it's already a string (like CDN link), use it directly
        preview = file;
    } else if (data?.imageUrl) {
        preview = data.imageUrl;
    }

    return (
        <div style={{ marginBottom: "1rem" }}>

            {(!preview && !data?.imageUrl) &&
                <>
                    {label}

                    < input
                        id={name}
                        name={name}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />
                </>
            }

            {(preview || data?.imageUrl) && (
                <div className="image-wrapper">

                    <div className="common-image-section">
                        <img
                            src={preview || data?.imageUrl}
                            alt="Preview"
                        />
                    </div>

                    <div className="controls-section">
                        <div className="trash-gradient" style={{ cursor: "pointer" }} onClick={() => handleDeleteImage()}>
                            <Trash width={32} height={32} />
                        </div>
                        <div >
                            <label
                                style={{ cursor: "pointer" }}
                                htmlFor={"image"}
                            >
                                <RefreshCw color="#000" width={32} height={32} />
                            </label>
                            < input
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
            )
            }
        </div >
    );
};

export default ImageField;
