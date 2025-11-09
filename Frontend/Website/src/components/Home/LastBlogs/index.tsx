import styles from "./LastBlogs.module.scss"
import { Link } from 'react-router';
import { useEffect, useState } from "react";
import { getLastBlogs, type BlogProps } from "../../../api/blog";
import { formatDate } from "../../../utils/formatDate";
import { useTranslation } from "react-i18next";

const LastBlogs = () => {
    const [lastBlogs, setLastBlogs] = useState<BlogProps[] | null>(null);
    const { t } = useTranslation();

    const fetchLastBlogs = async () => {
        const res = await getLastBlogs();
        if (res) {
            setLastBlogs(res);
        }
    }

    useEffect(() => {
        fetchLastBlogs();
    }, [])

    return (
        <div className={styles.blogsSection}>

            <div className={styles.blogsHeadline}>
                <h2>{t("blog")}</h2>
                <Link to={"/blogs"}>
                    {t("seall")}
                </Link>
            </div>
            <div className={styles.lastBlogsContainer}>
                <div className={styles.topBlogDesign}></div>
                {
                    lastBlogs && lastBlogs.map(({ id, blogImgUrl, blogTitle, createdAt, slug }) => (
                        <div className={styles.blogWrapper} key={id}>
                            <div className={styles.imageWrapper}>
                                <img src={blogImgUrl} alt={blogTitle} />
                            </div>
                            <div className={styles.dateWrapper}>
                                {formatDate(createdAt)}
                            </div>
                            <h3>{blogTitle}</h3>
                            <Link to={`/blogs/${slug}`}>
                                <div className={styles.readMoreWrapper}>
                                    <p>{t("readmore")}</p>
                                    <span>➡</span>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LastBlogs
