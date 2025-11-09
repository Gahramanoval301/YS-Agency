import { useFormik } from "formik";
import type { FormikHelpers, FormikValues } from "formik";

import { ObjectSchema } from "yup";

type SubmitFunction<T> = (
  values: T,
  helpers: FormikHelpers<T>
) => void | Promise<any>;

const useFormikForm = <T extends FormikValues>(
  initialValues: T,
  validationSchema: ObjectSchema<object>,
  onSubmit: SubmitFunction<T>,
  enableReinitialize?: boolean
) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: enableReinitialize ?? false
  });

  return formik;
};

export default useFormikForm;
