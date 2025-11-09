import BlogsSection from '../../components/Blogs/BlogsSection';
import CategorySection from '../../components/Blogs/CategorySection';
import CommonLayout from '../../components/layout/CommonLayout'

const Blogs = () => {
  // const blogSchemaValidation = useBlogSchemaValidation();

  // const formik = useFormikForm<BlogFormValues>(
  //   blogInitialValues,
  //   blogSchemaValidation,
  //   onSubmit
  // );

  // async function onSubmit() {

  // }

  return (
    <CommonLayout sectionTitle='Blog'>

      <CategorySection/>
      <BlogsSection/>
      

    </CommonLayout>
  )
}

export default Blogs
