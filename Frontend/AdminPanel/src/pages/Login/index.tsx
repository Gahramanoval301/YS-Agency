import { loginInitialValues, useLoginSchemaValidation, type LoginFormValues } from '../../data/authFormData';
import useFormikForm from '../../hooks/useFormikForm';
import styles from "./index.module.css"
import TextField from '../../components/common/TextField';
import { loginUser } from '../../api/auth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();

    const authSchemaValidation = useLoginSchemaValidation();
    const formik = useFormikForm<LoginFormValues>(
        loginInitialValues,
        authSchemaValidation,
        onSubmit
    );

    async function onSubmit(values: LoginFormValues) {

        const resData = await loginUser(values);

        if (resData.success) {
            localStorage.setItem("userEmail", JSON.stringify(resData.data.userEmail))
            navigate("/")
        } else {
            toast.error("Credentials are wrong!")
        }
    }
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center login-form' >
            <div className={styles.blurDesign}></div>

            <form action="" onSubmit={formik.handleSubmit}>

                <div className='w-[450px] rounded-lg border-2 ' style={{ padding: "1rem", color: "white !important", margin: "auto" }}>
                    <h2 className='text-2xl font-semibold' style={{ marginBottom: "1rem" }}>Login Form</h2>


                    <TextField formik={formik} name="userEmail" placeholder="Enter email" className="common-text-field" isEdit />
                    <div style={{ marginTop: "1rem" }}>
                        <TextField formik={formik} name="password" type="password" placeholder="Enter password" className="common-text-field" isEdit />
                    </div>

                    <div className={styles.btnWrapper}>
                        <button className={styles.mainBtn}>Save</button>
                    </div>
                </div>
            </form>

        </div >
    )
}

export default Login
