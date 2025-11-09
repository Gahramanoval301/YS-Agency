import { PenLine } from 'lucide-react';
import { useState } from 'react'
import TextField from '../common/TextField';

interface ContactTextSectionProps {
    formik: any;
}

const ContactTextSection = ({ formik }: ContactTextSectionProps) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className='formSection' style={{ padding: "2rem" }}>
            <div className='flex items-center justify-end'>
                <button type='button' className='cursor-pointer' onClick={() => setIsEdit(prev => !prev)}>
                    <PenLine />
                </button>
            </div>

            <div style={{ marginTop: "1.5rem" }}>

                <label htmlFor="headline" className='common-label'>Heading</label>
                <TextField
                    formik={formik}
                    name="headline"
                    placeholder="Heading"
                    className="common-text-field purple-text-field"
                    isEdit={isEdit}
                />
                <label htmlFor="subHeadline" className='common-label'>Subheading</label>
                <TextField
                    formik={formik}
                    name="subHeadline"
                    placeholder="Subheading"
                    className="common-text-field"
                    isEdit={isEdit}
                />
            </div>

        </div>
    )
}

export default ContactTextSection
