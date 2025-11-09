import styles from "./SimilarBlogs.module.scss"
import { useEffect, useState } from "react";
import { getLastBlogs, type BlogProps } from "../../../api/blog";
import { formatDate } from "../../../utils/formatDate";

const SimilarBlogs = () => {

  const [lastBlogs, setLastBlogs] = useState<BlogProps[] | null>(null)

  async function fetchLastBlogs() {
    const resData = await getLastBlogs();
    setLastBlogs(resData);
  }
  useEffect(() => {
    fetchLastBlogs();
  }, [])

  return (
    <div>
      <h4>Last Blogs</h4>
      <div className={styles.lastBlogsContainer}>
        {
          lastBlogs && lastBlogs.map(({ id, blogImgUrl, createdAt, blogTitle }: BlogProps) => (
            <div className={styles.blogWrapper} key={id}>
              <div className={styles.imageWrapper}>
                <img src={blogImgUrl} alt={blogTitle} />
              </div>
              <div className={styles.dateWrapper}>
                {formatDate(createdAt)}
              </div>
              <h3>{blogTitle}</h3>
              <div className={styles.readMoreWrapper}>
                <p>Read More</p>
                <span>➡</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SimilarBlogs

