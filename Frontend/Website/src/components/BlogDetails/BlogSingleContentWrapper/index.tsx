// import React from 'react'
import { useState } from "react";
import type { Blog } from "../../../pages/BlogDetails"
import styles from "./BlogSingleContentWrapper.module.scss"
import { Link, useNavigate } from "react-router";
import type { BlogProps } from "../../../api/blog";
import { formatDate } from "../../../utils/formatDate";
import HtmlParser from "../../shared/HtmlParser";
import BlogShare from "../BlogShare";
const BlogSingleContentWrapper = ({ data }: { data: BlogProps }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/blogs?search=${encodeURIComponent(searchValue)}`);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className={styles.blogSingleContentWrapper}>

      <div className={styles.imageWrapper}>
        <img src={data.blogImgUrl} alt="" />
      </div>

      <div className={styles.gridWrapper}>

        <div className={styles.contentWrapper}>
          <h2>{data.blogTitle}</h2>
          <div className={styles.dateWrapper}>
            {formatDate(data.createdAt)}
          </div>
          <p>


            <HtmlParser data={data.blogContent} />
          </p>
        </div>

        <div className={styles.generalInfoWrapper}>
          <div className={styles.searchWrapper}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Axtar..."
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}

              />
              <i>⭕</i>
            </div>
          </div>

          <div>
            <h3>Kateqoriyalar</h3>
            <div className={styles.categoriesWrapper}>
              {data.Categories.map(category => (
                <p
                  key={category.id}
                  onClick={() => navigate(`/blogs?category=${category.id}`)}
                >
                  {category.title}
                </p>
              ))}
            </div>

          </div>

          <div>
            <h3>Etiketler</h3>
            <div className={styles.tagsWrapper}>
              {data.Tags.map(tag => (
                <p
                  key={tag.id}
                  onClick={() => navigate(`/blogs?tag=${tag.id}`)}
                >
                  {tag.title}
                </p>
              ))}
            </div>
          </div>


          <div>
            <h3 style={{ marginBlock: "0px" }}>Bizi izleyin</h3>
            <div className={styles.socialMediasWrapper}>

              <BlogShare
                blogUrl={window.location.href}
                blogTitle={data.blogTitle}
              />

              {/* {data.socialMedias.map(socialMedia => (
                <Link to={socialMedia.link}>
                  <div className={styles.iconWrapper}>

                    <i>{socialMedia.type}</i>
                  </div>
                </Link>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSingleContentWrapper