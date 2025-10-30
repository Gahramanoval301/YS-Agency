import BlogsSection from '../../components/Blogs/BlogsSection';
import CategorySection from '../../components/Blogs/CategorySection';
import SingleSelectField from '../../components/common/SingleSelectField'
import CommonLayout from '../../components/layout/CommonLayout'
import { blogInitialValues, useBlogSchemaValidation, type BlogFormValues } from '../../data/blogFormData';
import useFormikForm from '../../hooks/useFormikForm';

const Blogs = () => {
  const blogSchemaValidation = useBlogSchemaValidation();

  const formik = useFormikForm<BlogFormValues>(
    blogInitialValues,
    blogSchemaValidation,
    onSubmit
  );

  async function onSubmit() {

  }

  return (
    <CommonLayout sectionTitle='Blog'>

      <CategorySection/>
      <BlogsSection/>
      

    </CommonLayout>
  )
}

export default Blogs
