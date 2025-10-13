// import React from 'react'
import { useState } from "react";
import type { Blog } from "../../../pages/BlogDetails"
import styles from "./BlogSingleContentWrapper.module.scss"
import { Link } from "react-router";
const BlogSingleContentWrapper = ({ data }: { data: Blog }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className={styles.blogSingleContentWrapper}>

      <div className={styles.imageWrapper}>
        <img src={data.imgUrl} alt="" />
      </div>

      <div className={styles.gridWrapper}>
        
        <div className={styles.contentWrapper}>
          <h2>{data.title}</h2>
          <div className={styles.dateWrapper}>
            {data.date}
          </div>
          <p>{data.content}</p>
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
              />
              <i>⭕</i>
            </div>
          </div>

          <div>
            <h3>Kateqoriyalar</h3>
            <div className={styles.categoriesWrapper}>

              {data.categories.map(category => (
                <p>{category}</p>
              ))}
            </div>
          </div>

          <div>
            <h3>Etiketler</h3>
            <div className={styles.tagsWrapper}>

              {data.tags.map(tag => (
                <p>{tag}</p>
              ))}
            </div>
          </div>


          <div>
            <h3>Bizi izleyin</h3>
            <div className={styles.socialMediasWrapper}>

              {data.socialMedias.map(socialMedia => (
                <Link to={socialMedia.link}>
                  <div className={styles.iconWrapper}>

                    <i>{socialMedia.type}</i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSingleContentWrapper