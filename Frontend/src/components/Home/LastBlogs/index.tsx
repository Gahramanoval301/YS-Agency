import styles from "./LastBlogs.module.scss"
import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import Gallery3 from "../../../assets/images/Gallery/gallery3.png";
import { Link } from 'react-router';


const LAST_BLOGS_DATA = [
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
const LastBlogs = () => {
    return (
        <div className={styles.blogsSection}>

            <div className={styles.blogsHeadline}>
                <h2>Blog</h2>
                <Link to={"/"}>
                    See all
                </Link>
            </div>
            <div className={styles.lastBlogsContainer}>
                <div className={styles.topBlogDesign}></div>
                {
                    LAST_BLOGS_DATA.map(({ id, imgUrl, date, title }) => (
                        <div className={styles.blogWrapper} key={id}>
                            <div className={styles.imageWrapper}>
                                <img src={imgUrl} alt={title} />
                            </div>
                            <div className={styles.dateWrapper}>
                                {date}
                            </div>
                            <h3>{title}</h3>
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

export default LastBlogs
