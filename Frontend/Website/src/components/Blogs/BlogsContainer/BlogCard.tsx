import React, { useEffect, useState } from 'react'
import styles from "./BlogsContainer.module.scss"
import { Link, useNavigate } from 'react-router'

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
            onClick={() => navigate(`/blogs/${blog.id}`)}
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
                                        {blog.date}
                                    </div>
                                    <p className={styles.headline}>{blog.title}</p>

                                    <div className={styles.tagContainer}>
                                        {
                                            blog.tags.map(tag => (
                                                <Link to={"/"}>
                                                    {tag}
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
                                    <img src={blog.imgUrl} />
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
                                                {blog.date}
                                            </div>
                                            <p className={styles.headline}>{blog.title}</p>

                                            <div className={styles.tagContainer}>
                                                {
                                                    blog.tags.map(tag => (
                                                        <Link to={"/"}>
                                                            {tag}
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
                                            <img src={blog.imgUrl} />
                                        </div>
                                    </div>
                                    :
                                    <div className={styles.cardFront}
                                        style={{ backgroundImage: `url(${blog.imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    >
                                        <div className={styles.dateWrapper}>
                                            {blog.date}
                                        </div>
                                        <div className={styles.contentWrapper}>
                                            <p>{blog.title}</p>
                                            <div className={styles.readMoreWrapper}>
                                                <span>Read More</span>
                                                <i>🛑</i>
                                            </div>
                                            <div className={styles.tagContainer}>
                                                {
                                                    blog.tags.map(tag => (
                                                        <Link to={"/"}>
                                                            {tag}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                                {!isWideItem && <div className={styles.cardBack}>
                                    <div className={styles.dateWrapper}>
                                        {blog.date}
                                    </div>
                                    <div className={styles.contentWrapper}>
                                        <p className={styles.headline}>{blog.title}</p>

                                        <p className={styles.content}>{blog.content.slice(0, 200)}...</p>
                                        <div className={styles.tagContainer}>
                                            {
                                                blog.tags.map(tag => (
                                                    <Link to={"/"}>
                                                        {tag}
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
                                    style={{ backgroundImage: `url(${blog.imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                >
                                    <div className={styles.dateWrapper}>
                                        {blog.date}
                                    </div>
                                    <div className={styles.contentWrapper}>
                                        <p>{blog.title}</p>
                                        <div className={styles.readMoreWrapper}>
                                            <span>Read More</span>
                                            <i>🛑</i>
                                        </div>
                                        <div className={styles.tagContainer}>
                                            {
                                                blog.tags.map(tag => (
                                                    <Link to={"/"}>
                                                        {tag}
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                {!isWideItem && <div className={styles.cardBack}>
                                    <div className={styles.dateWrapper}>
                                        {blog.date}
                                    </div>
                                    <div className={styles.contentWrapper}>
                                        <p className={styles.headline}>{blog.title}</p>

                                        <p className={styles.content}>{blog.content.slice(0, 200)}...</p>
                                        <div className={styles.tagContainer}>
                                            {
                                                blog.tags.map(tag => (
                                                    <Link to={"/"}>
                                                        {tag}
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
