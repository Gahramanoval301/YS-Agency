import { useEffect, useState } from 'react'
import styles from "./BlogsContainer.module.scss"
import { Link, useNavigate } from 'react-router'
import type { CategoryProps } from '../../../api/blog'
import HtmlParser from '../../shared/HtmlParser'
import { formatDate } from '../../../utils/formatDate'

const BlogCard = ({ rowIndex, index, row, blog, chunkSize }) => {
    // Determine dynamic class
    let dynamicClass = ''
    let isWideItem = false;
    if (chunkSize !== 1) {

        if ((rowIndex === 0 || rowIndex === 2) && index === 0) dynamicClass = styles.item1
        if (rowIndex === 1 && index === row.length - 1) dynamicClass = styles.item1right

        isWideItem = (dynamicClass === styles.item1 || dynamicClass === styles.item1right) && chunkSize !== 1
    }


    const [isMobile, setIsMobile] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [activeBlog, setActiveBlog] = useState<number | null>(0)
    const handleHover = (id: number) => setActiveBlog(id)
    const navigate = useNavigate();

    console.log(activeBlog);


    useEffect(() => {
        try {

            setIsLoading(true)
            const handleResize = () => {
                const width = window.innerWidth
                if (width <= 650) {
                    setIsMobile(true)
                }
            }

            handleResize()
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        } catch {

        } finally {
            setIsLoading(false);
        }
    }, [])

    console.log(chunkSize);

    if (isLoading) {
        return <>Loading...</>
    }


    return (
        <div
            onClick={() => navigate(`/blogs/${blog.slug}`)}
            key={blog.id + index}
            className={`${styles.blogItem} ${dynamicClass} ${isWideItem ? styles.wideItem : ''}`}
            onMouseEnter={() => handleHover(blog.id)}
        >
            {
                isWideItem && chunkSize !== 1 ?
                    <div className={styles.card}>
                        <div className={styles.cardInner}>
                            <div className={styles.cardFront}>
                                <div className={styles.contentWrapper}>
                                    <div className={styles.dateWrapper}>
                                        {formatDate(blog.createdAt)}
                                    </div>
                                    <p className={styles.headline}>{blog.blogTitle}</p>

                                    <div className={styles.tagContainer}>
                                        {blog.Tags.map((tag: CategoryProps) => (
                                            <Link
                                                key={tag.id}
                                                to={`/blogs?tag=${tag.id}`}
                                                onClick={(e) => e.stopPropagation()} 
                                            >
                                                {tag.title}
                                            </Link>
                                        ))}
                                    </div>



                                    <div className={styles.readMoreWrapper}>
                                        <span>Read More</span>
                                        <i>🛑</i>
                                    </div>
                                </div>
                                <div className={styles.imageWrapper}>
                                    <img src={blog.blogImgUrl} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : chunkSize === 1 ? <div className={styles.singleBlogItem}>
                        <div className={styles.card}
                        >
                            <div className={styles.cardInner}>
                                {!isMobile ?
                                    <div className={`${styles.cardFront} ${styles.singleItem}`}
                                    >
                                        <div className={styles.textWrapper}>
                                            <div className={styles.singleDateWrapper}>
                                                {formatDate(blog.createdAt)}
                                            </div>
                                            <p className={styles.headline}>{blog.blogTitle}</p>

                                            <div className={styles.tagContainer}>
                                                {
                                                    blog.Tags.map((tag: CategoryProps) => (
                                                        <Link to={"/"}>
                                                            {tag.title}
                                                        </Link>
                                                    ))
                                                }
                                            </div>

                                            <div className={styles.readMoreWrapper}>
                                                <span>Read More</span>
                                                <i>🛑</i>
                                            </div>
                                        </div>
                                        <div className={styles.imageWrapper}>
                                            <img src={blog.blogImgUrl} />
                                        </div>
                                    </div>
                                    :
                                    <div className={styles.cardFront}
                                        style={{ backgroundImage: `url(${blog.blogImgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    >
                                        <div className={styles.dateWrapper}>
                                            {formatDate(blog.createdAt)}
                                        </div>
                                        <div className={styles.contentWrapper}>
                                            <p>{blog.blogTitle}</p>
                                            <div className={styles.readMoreWrapper}>
                                                <span>Read More</span>
                                                <i>🛑</i>
                                            </div>
                                            <div className={styles.tagContainer}>
                                                {
                                                    blog.Tags.map((tag: CategoryProps) => (
                                                        <Link to={"/"}>
                                                            {tag.title}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                                {!isWideItem && <div className={styles.cardBack}>
                                    <div className={styles.dateWrapper}>
                                        {formatDate(blog.createdAt)}                                    </div>
                                    <div className={styles.contentWrapper}>
                                        <p className={styles.headline}>{blog.blogTitle}</p>

                                        <p className={styles.content}>
                                            <HtmlParser data={blog.blogContent.slice(0, 200)} />...</p>                                        <div className={styles.tagContainer}>
                                            {
                                                blog.Tags.map((tag: CategoryProps) => (
                                                    <Link to={"/"}>
                                                        {tag.title}
                                                    </Link>
                                                ))
                                            }
                                        </div>

                                        <div className={styles.readMoreWrapper}>
                                            <span>Read More</span>
                                            <i>🛑</i>
                                        </div>
                                    </div></div>}
                            </div>
                        </div></div> :
                        <div className={styles.card}
                        >
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}
                                    style={{ backgroundImage: `url(${blog.blogImgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                >
                                    <div className={styles.dateWrapper}>
                                        {formatDate(blog.createdAt)}
                                    </div>
                                    <div className={styles.contentWrapper}>
                                        <p>{blog.blogTitle}</p>
                                        <div className={styles.readMoreWrapper}>
                                            <span>Read More</span>
                                            <i>🛑</i>
                                        </div>
                                        <div className={styles.tagContainer}>
                                            {
                                                blog.Tags.map((tag: CategoryProps) => (
                                                    <Link to={"/"}>
                                                        {tag.title}
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                {!isWideItem && <div className={styles.cardBack}>
                                    <div className={styles.dateWrapper}>
                                        {formatDate(blog.createdAt)}
                                    </div>
                                    <div className={styles.contentWrapper}>
                                        <p className={styles.headline}>{blog.blogTitle}</p>

                                        <p className={styles.content}>
                                            <HtmlParser data={blog.blogContent.slice(0, 200)} />...</p>
                                        <div className={styles.tagContainer}>
                                            {
                                                blog.Tags.map((tag: CategoryProps) => (
                                                    <Link to={"/"}>
                                                        {tag.title}
                                                    </Link>
                                                ))
                                            }
                                        </div>

                                        <div className={styles.readMoreWrapper}>
                                            <span>Read More</span>
                                            <i>🛑</i>
                                        </div>
                                    </div></div>}
                            </div>
                        </div>
            }
        </div>
    )
}


export default BlogCard
