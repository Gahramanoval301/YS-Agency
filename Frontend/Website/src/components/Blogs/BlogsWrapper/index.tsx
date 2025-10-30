import React, { useEffect, useState } from "react";
import styles from "./BlogsWrapper.module.scss";
import BlogsContainer from "../BlogsContainer";
import CustomSelect from "../../shared/CustomSelect";
import { getAllBlogs, getCategories, type BlogProps, type CategoryProps } from "../../../api/blog";
import { useSearchParams } from "react-router";



const BlogsWrapper = () => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedTag, setSelectedTag] = useState<string | null>(null) // optional if needed
    const [searchParams, setSearchParams] = useSearchParams();

    const [isMobile, setIsMobile] = useState(false)
    const [categories, setCategories] = useState<CategoryProps[] | null>(null)
    const [blogSizeLimit, setBlogSizeLimit] = useState(9)
    const [blogs, setBlogs] = useState<BlogProps[] | null>(null)
    // Pagination state
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1) // total pages from backend


    const fetchData = async () => {
        const resCategories = await getCategories(1, 100)
        const resBlogs = await getAllBlogs(
            page,
            blogSizeLimit,
            selectedCategory || "",
            selectedTag || "",
            searchValue || ""
        )
        setCategories(resCategories.data)
        setBlogs(resBlogs.data)
        setPages(resBlogs.pages || 1) // total pages from backend
    }
    console.log(blogs);

    useEffect(() => {
        fetchData();
    }, [page, selectedCategory, selectedTag, searchValue])

    useEffect(() => {
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const tag = searchParams.get("tag");

        if (category) setSelectedCategory(category);
        if (tag) setSelectedTag(tag);
        if (search) setSearchValue(search);
    }, []);

    useEffect(() => {
        const params: any = {};

        if (selectedCategory) params.category = selectedCategory;
        if (selectedTag) params.tag = selectedTag;
        if (searchValue) params.search = searchValue;

        setSearchParams(params);
    }, [selectedCategory, searchValue, selectedTag]);



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 900) {
                setIsMobile(true)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        setPage(1) // reset to first page when searching
    }

    const handleCategorySelect = (id: string | null) => {
        setSelectedCategory(id)
        setPage(1) // reset to first page when selecting category
    }


    return (
        <div className={styles.blogsWrapperContainer}>
            <div className={styles.searchWrapper}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Axtar..."
                        value={searchValue}
                        onChange={handleChange}
                    />
                    <i>⭕</i>
                </div>
            </div>


            {
                categories &&
                <>
                    {
                        isMobile ?
                            <CustomSelect
                                selectBoxStyles={{ maxWidth: "350px" }}
                                selectContainerStyles={{ marginLeft: "auto" }}
                                options={categories}
                                placeholder="Select Category"
                                onChange={(val) => handleCategorySelect(val?.id || null)}
                            />
                            :
                            <div className={styles.filterBtnsContainer}>
                                {
                                    categories.map(filterBtn => (
                                        <button key={filterBtn.id} onClick={(val) => handleCategorySelect(filterBtn?.id || null)}>
                                            <i>🌸</i>
                                            <p>{filterBtn.title}</p>
                                        </button>
                                    ))
                                }
                            </div>
                    }
                </>
            }

            <BlogsContainer setBlogSizeLimit={setBlogSizeLimit} blogs={blogs} />

            <div className={styles.blogPaginationWrapper} style={{ marginBlock: "2rem" }}>
                <button
                    type="button"
                    className={styles.mainBtn}
                    disabled={page <= 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                >
                    ← Previous
                </button>

                <span>
                    Page <strong>{page}</strong> of <strong>{pages}</strong>
                </span>

                <button
                    type="button"
                    className={styles.mainBtn}
                    disabled={page >= pages}
                    onClick={() => setPage(prev => Math.min(prev + 1, pages))}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default BlogsWrapper;
