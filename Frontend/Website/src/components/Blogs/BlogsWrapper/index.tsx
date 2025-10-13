import React, { useEffect, useState } from "react";
import styles from "./BlogsWrapper.module.scss";
import { filter, label } from "motion/react-client";
import BlogsContainer from "../BlogsContainer";
import CustomSelect from "../../shared/CustomSelect";


const BLOG_FILTER_BTNS = [
    {
        label: "SMM",
        value: "smm",
    },
    {
        label: "Digital Marketing",
        value: "digital_marketing"
    },
    {
        label: "Design",
        value: "design"
    },
    {
        label: "Brand voice and tone",
        value: "brand_voice_and_tone"
    },
    {
        label: "Interest rate",
        value: "interest_rate"
    },
]

const BlogsWrapper = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isMobile, setIsMobile] = useState(false)


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
        setSearchValue(e.target.value);
    };

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
                isMobile ?
                    <CustomSelect
                        selectBoxStyles={{ maxWidth: "350px" }}
                        selectContainerStyles={{ marginLeft: "auto" }}
                        options={BLOG_FILTER_BTNS}
                        placeholder="Select Category"
                        onChange={(val) => console.log("Selected:", val)} />
                    :
                    <div className={styles.filterBtnsContainer}>
                        {
                            BLOG_FILTER_BTNS.map(filterBtn => (
                                <button key={filterBtn.value}>
                                    <i>🌸</i>
                                    <p>{filterBtn.label}</p>
                                </button>
                            ))
                        }
                    </div>
            }

            <BlogsContainer />
        </div>
    );
};

export default BlogsWrapper;
