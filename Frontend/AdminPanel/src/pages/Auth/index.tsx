import React, { useEffect, useState } from 'react'
import CommonLayout from '../../components/layout/CommonLayout'
import { changePasswordInitialValues, useChangePasswordValidation, type ChangePasswordFormValues } from '../../data/authFormData';
import useFormikForm from '../../hooks/useFormikForm';
import TextField from '../../components/common/TextField';
import { changePassword } from '../../api/auth';

const Auth = () => {
  const [currentEmail, setCurrentEmail] = useState(null);

  const authSchemaValidation = useChangePasswordValidation();
  const formik = useFormikForm<ChangePasswordFormValues>(
    changePasswordInitialValues,
    authSchemaValidation,
    onSubmit
  );

  async function onSubmit(values: ChangePasswordFormValues) {
    console.log(values);
    const { confirmNewPassword, ...payload } = values;

    if (currentEmail) {

      const resData = await changePassword({ userEmail: currentEmail, ...payload });

      console.log(resData);
    }


  }

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      const currentAdminEmail = JSON.parse(storedEmail);
      setCurrentEmail(currentAdminEmail);
    } else {
      setCurrentEmail(null);
    }
  }, []);


  return (
    <div>
      <CommonLayout sectionTitle="Auth">
        <div>
          <h3 className='text-lg'>Current Details: </h3>
          <div className='flex items-center gap-2' style={{ marginTop: "1rem" }}>
            <p className='font-semibold text-[#ff50fc]' >Gmail:</p>
            <span>{currentEmail}</span>
          </div>

          <h3 className='text-xl font-semibold underline underline-offset-8' style={{ marginTop: "1.5rem" }}>Settings</h3>

          <form action="" onSubmit={formik.handleSubmit} className='classicFormSection'>

            <h4 className='text-lg' style={{ marginBlock: "1rem", marginTop: "2rem" }}>Change Password</h4>
            <div className='flex flex-col gap-1  w-full sm:w-[400px]'>
              <TextField formik={formik} name="oldPassword" type='password' placeholder="Enter old password" className="common-text-field" isEdit />
              <TextField formik={formik} name="newPassword" type='password' placeholder="Enter new password" className="common-text-field" isEdit />
              <TextField formik={formik} name="confirmNewPassword" type='password' placeholder="Confirm new password" className="common-text-field" isEdit />

              <div className='btnWrapper left-side'>
                <button className='mainBtn'>
                  Save
                </button>
              </div>
            </div>



          </form>
        </div>
      </CommonLayout>
    </div>
  )
}

export default Auth
