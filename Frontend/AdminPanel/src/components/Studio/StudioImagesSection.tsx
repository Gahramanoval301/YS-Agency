
import ImageField from "../common/ImageField";
import { Image } from "lucide-react";

interface StudioImagesSectionProps {
    formik: any;
}

const imageNotes = [
    { note: "Please add 280x280 size image." },
    { note: "Please add 200x220 size image." },
    { note: "Please add 200x220 size image." },
    { note: "Please add 180x340 size image." },
    { note: "Please add 320x350 size image." },
];

const StudioImagesSection = ({ formik }: StudioImagesSectionProps) => {

    return (
        <div className="grid gap-4" style={{ marginTop: "2rem" }}>
            <h3 className="font-semibold text-2xl">Images Section</h3>
            {imageNotes.map((img, index) => (
                <div
                    key={index}
                    className="flex flex-col border rounded-2xl shadow-sm "
                    style={{ padding: "2rem" }}
                >
                    <p className="text-gray-500 mb-2 italic" style={{ marginBottom: "1rem" }}>{img.note}</p>

                    <ImageField
                        isProject
                        formik={formik}
                        name={`images.${index}.imgUrl`}
                        fileIdName={`images.${index}.imgFileId`}
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


                </div>
            ))}
        </div>
    );
};

export default StudioImagesSection;
