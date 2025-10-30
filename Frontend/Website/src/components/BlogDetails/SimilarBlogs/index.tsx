import styles from "./SimilarBlogs.module.scss"
import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import Gallery3 from "../../../assets/images/Gallery/gallery3.png";
import { useEffect, useState } from "react";
import { getLastBlogs, type BlogProps } from "../../../api/blog";
import { formatDate } from "../../../utils/formatDate";


const SIMILAR_BLOGS_DATA = [
  {
    id: 0,
    imgUrl: Gallery1,
    date: "31.03.2025",
    title: "2025-ci ildə populyar olacaq yeni video məzmun formatları",
    blogUrl: "",
  },
  {
    id: 1,
    imgUrl: Gallery2,
    date: "31.03.2025",
    title: "2025-ci ildə populyar olacaq yeni video məzmun formatları",
    blogUrl: "",
  },
  {
    id: 2,
    imgUrl: Gallery3,
    date: "31.03.2025",
    title: "2025-ci ildə populyar olacaq yeni video məzmun formatları",
    blogUrl: "",
  },
]
const SimilarBlogs = () => {

  const [lastBlogs, setLastBlogs] = useState(null)

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

