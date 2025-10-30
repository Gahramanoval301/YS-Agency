import { useEffect, useState } from 'react'
import styles from "./BlogsContainer.module.scss"
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import BlogCard from './BlogCard';
import type { BlogProps } from '../../../api/blog';

const BlogsContainer = ({ setBlogSizeLimit, blogs }: { setBlogSizeLimit: React.Dispatch<React.SetStateAction<number>>, blogs: BlogProps[] }) => {
    const [chunkSize, setChunkSize] = useState(3)
    const [blogRows, setBlogRows] = useState();

    console.log(blogs, "myy");

    // Split array into chunks utility
    const chunkArray = <T,>(arr: T[], chunkSize: number): T[][] => {
        console.log("arr", arr);

        if (arr) {

            const chunks: T[][] = []
            for (let i = 0; i < arr.length; i += chunkSize) {
                chunks.push(arr.slice(i, i + chunkSize))
            }
            return chunks
        } else {
            return []
        }
    }

    // Watch screen size
    useEffect(() => {
        const updateChunkSize = () => {
            if (window.innerWidth < 900) {
                setChunkSize(1)
            } else if (window.innerWidth < 1280) {
                setChunkSize(2)
            } else {
                setChunkSize(3)
                setBlogSizeLimit(9);
            }
        }

        updateChunkSize() // set initial value
        window.addEventListener('resize', updateChunkSize)

        return () => window.removeEventListener('resize', updateChunkSize)
    }, [])

    useEffect(() => {
        console.log("bloggg", blogs);


        const blogRowsChunked = chunkArray(blogs, chunkSize);
        setBlogRows(blogRowsChunked)
        console.log("chunkedd", blogRowsChunked);


    }, [chunkSize, blogs])


    return (
        <div className={styles.blogsContainer} style={{ overflowX: "hidden" }}>
            {blogRows && blogRows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.blogsGrid} style={{ overflow: "hidden" }}>
                    {row.map((blog, index) => {
                        // Determine dynamic class names

                        return (
                            <BlogCard blog={blog} index={index} row={row} rowIndex={rowIndex} chunkSize={chunkSize} />
                        )
                    })}
                </div>
            ))}
        </div>

    )
}

export default BlogsContainer
