import React, { useEffect, useState } from 'react'
import styles from "./BlogsContainer.module.scss"
import Gallery1 from "../../../assets/images/Gallery/gallery1.png";
import Gallery2 from "../../../assets/images/Gallery/gallery2.png";
import Gallery3 from "../../../assets/images/Gallery/gallery3.png";
import BlogCard from './BlogCard';
export const BLOGS_DATA = [
    {
        id: 0,
        date: "31.03.2025",
        title: "2025-ci ildə populyar olacaq yeni video məzmun formatları",
        tags: ["design", "interesting rate"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imgUrl: Gallery2,
        categories: [
            "SMM",
            "Digital Marketing",
            "Design",
            "Brand voice and Tone",
            "Interest Rate"
        ],
        socialMedias: [{
            type: "İns",
            link: ""
        },
        {
            type: "Ln",
            link: ""
        },
        {
            type: "Tk",
            link: ""
        },
        {
            type: "Yt",
            link: ""
        }
        ]
    },
    {
        id: 1,
        date: "15.04.2025",
        title: "Dizaynda minimalizmin gücü",
        tags: ["ui", "ux"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imgUrl: Gallery2,
        categories: [
            "SMM",
            "Digital Marketing",
            "Design",
            "Brand voice and Tone",
            "Interest Rate"
        ],
        socialMedias: [{
            type: "İns",
            link: ""
        },
        {
            type: "Ln",
            link: ""
        },
        {
            type: "Tk",
            link: ""
        },
        {
            type: "Yt",
            link: ""
        }
        ]
    },
    {
        id: 2,
        date: "15.04.2025",
        title: "Dizaynda minimalizmin gücü",
        tags: ["ui", "ux"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        imgUrl: Gallery2,
        categories: [
            "SMM",
            "Digital Marketing",
            "Design",
            "Brand voice and Tone",
            "Interest Rate"
        ],
        socialMedias: [{
            type: "İns",
            link: ""
        },
        {
            type: "Ln",
            link: ""
        },
        {
            type: "Tk",
            link: ""
        },
        {
            type: "Yt",
            link: ""
        }
        ]
    },
    {
        id: 3,
        date: "15.04.2025",
        title: "Dizaynda minimalizmin gücü",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        tags: ["ui", "ux"],
        imgUrl: Gallery2,
        categories: [
            "SMM",
            "Digital Marketing",
            "Design",
            "Brand voice and Tone",
            "Interest Rate"
        ],
        socialMedias: [{
            type: "İns",
            link: ""
        },
        {
            type: "Ln",
            link: ""
        },
        {
            type: "Tk",
            link: ""
        },
        {
            type: "Yt",
            link: ""
        }
        ]
    },
    {
        id: 4,
        date: "15.04.2025",
        title: "Dizaynda minimalizmin gücü",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        tags: ["ui", "ux"],
        imgUrl: Gallery2,
        categories: [
            "SMM",
            "Digital Marketing",
            "Design",
            "Brand voice and Tone",
            "Interest Rate"
        ],
        socialMedias: [{
            type: "İns",
            link: ""
        },
        {
            type: "Ln",
            link: ""
        },
        {
            type: "Tk",
            link: ""
        },
        {
            type: "Yt",
            link: ""
        }
        ]
    },
    {
        id: 5,
        date: "15.04.2025",
        title: "Dizaynda minimalizmin gücü",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        tags: ["ui", "ux"],
        imgUrl: Gallery2,
        categories: [
            "SMM",
            "Digital Marketing",
            "Design",
            "Brand voice and Tone",
            "Interest Rate"
        ],
        socialMedias: [{
            type: "İns",
            link: ""
        },
        {
            type: "Ln",
            link: ""
        },
        {
            type: "Tk",
            link: ""
        },
        {
            type: "Yt",
            link: ""
        }
        ]
    },
    // {
    //     id: 1,
    //     date: "15.04.2025",
    //     title: "Dizaynda minimalizmin gücü",
    //     tags: ["ui", "ux"],
    //     content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    //     imgUrl: Gallery2,
    // },
    // {
    //     id: 1,
    //     date: "15.04.2025",
    //     title: "Dizaynda minimalizmin gücü",
    //     tags: ["ui", "ux"],
    //     content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    //     imgUrl: Gallery2,
    // },
    // {
    //     id: 1,
    //     date: "15.04.2025",
    //     title: "Dizaynda minimalizmin gücü",
    //     tags: ["ui", "ux"],
    //     content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    //     imgUrl: Gallery2,
    // },
];
const BlogsContainer = () => {
    const [chunkSize, setChunkSize] = useState(3)

    // Split array into chunks utility
    const chunkArray = <T,>(arr: T[], chunkSize: number): T[][] => {
        const chunks: T[][] = []
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize))
        }
        return chunks
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
            }
        }

        updateChunkSize() // set initial value
        window.addEventListener('resize', updateChunkSize)

        return () => window.removeEventListener('resize', updateChunkSize)
    }, [])


    const blogRows = chunkArray(BLOGS_DATA, chunkSize)

    return (
        <div className={styles.blogsContainer}>
            {blogRows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.blogsGrid}>
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
