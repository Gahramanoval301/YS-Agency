import React, { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog, updateBlog, updateBlogData, getCategories } from "../../api/blog";
import { blogInitialValues, useBlogSchemaValidation, type BlogFormValues } from "../../data/blogFormData";
import useFormikForm from "../../hooks/useFormikForm";
import TextField from "../common/TextField";
import RichTextField from "../common/RichTextField";
import MultipleSelectField from "../common/MultipleSelectField";
import HashtagField from "../common/TagSelectField";
import ImageField from "../common/ImageField";
import { Pencil, Trash, Image } from "lucide-react";
import styles from "./Blogs.module.css";
import CreateNewBlogSection from "./CreateNewBlogSection";

const BlogItem = ({ blog, reloadBlogs, options }) => {
    const [dimensions, setDimensions] = useState(null);
    const [data, setData] = useState(blog);

    const blogSchemaValidation = useBlogSchemaValidation();

    const onSubmit = async (values: BlogFormValues) => {
        console.log("Updating blog:", values);

        const formData = new FormData();

        for (const key in values) {
            if (key === "image") continue; // skip, handled below
            const value = values[key];

            if (Array.isArray(value)) {
                // Convert arrays to JSON strings
                formData.append(key, JSON.stringify(value));
            } else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        }

        // Append file if available
        if (values.image instanceof File) {
            formData.append("file", values.image);
        }

        await updateBlogData(blog.id, formData);
        reloadBlogs();
    };



    const formik = useFormikForm<BlogFormValues>(
        {
            blogTitle: blog.blogTitle,
            blogContent: blog.blogContent,
            blogCategories: blog.Categories?.map(cat => cat.id) || [], // ✅ map to ids
            blogTags: blog.Tags?.map(tag => tag.title) || [],
            image: blog.blogImgUrl || null,
        },
        blogSchemaValidation,
        onSubmit
    );
    console.log(formik.values, blog);



    const handleDelete = async () => {
        await deleteBlog(blog.id);
        reloadBlogs();
    };

    return (
        <form onSubmit={formik.handleSubmit} className={styles.blogContainer}>
            <div className={styles.headerSection} >
                <p>#{blog.id}</p>
                <div className="flex gap-2">
                    {/* <button type="submit">
                        <Pencil />
                    </button> */}
                    <button type="button" onClick={handleDelete}>
                        <Trash />
                    </button>
                </div>
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
                        setDimensions={setDimensions}
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

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isNewCreate, setIsNewCreate] = useState(false);
  const [reload, setReload] = useState(0);
  const [options, setOptions] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 2; // keep it fixed for now

  const fetchBlogs = async () => {
    const res = await getAllBlogs(page, limit); // ✅ use current page
    const resCategories = await getCategories(1, 100);

    setBlogs(res.data);
    setPages(res.pages || 1); // backend already returns total pages
    setOptions(resCategories.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, reload]);

  return (
    <div className="formSection" style={{ marginTop: "2rem" }}>
      <div className="headline-section">
        <h3 className="headline">Statistika</h3>
        <button
          type="button"
          className="add-btn"
          onClick={() => setIsNewCreate((prev) => !prev)}
        >
          Əlavə Et
        </button>
      </div>

      {isNewCreate && (
        <CreateNewBlogSection
          options={options}
          setIsNewCreate={setIsNewCreate}
          reloadBlogs={() => setReload((prev) => prev + 1)}
        />
      )}

      <h3 className="text-xl font-semibold">Full Blogs:</h3>

      {blogs.map((blog) => (
        <BlogItem
          key={blog.id}
          blog={blog}
          options={options}
          reloadBlogs={() => setReload((prev) => prev + 1)}
        />
      ))}

      {/* ✅ Pagination Controls */}
      <div
        className="flex justify-center items-center gap-4 mt-4"
        style={{ marginBottom: "2rem" }}
      >
        <button
          type="button"
          className="main-btn"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          ← Previous
        </button>

        <span>
          Page <strong>{page}</strong> of <strong>{pages}</strong>
        </span>

        <button
          type="button"
          className="main-btn"
          disabled={page >= pages}
          onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
        >
          Next →
        </button>
      </div>
    </div>
  );
};


export default BlogsSection;
