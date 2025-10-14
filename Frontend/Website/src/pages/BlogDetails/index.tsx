import { useParams } from 'react-router';
import SingleBlogDetailsWrapper from '../../components/BlogDetails/SingleBlogDetailsWrapper'
import { useEffect, useState } from 'react';
import { BLOGS_DATA } from '../../components/Blogs/BlogsContainer';

interface socialMedia {
    type: string;
    link: string;
}

export interface Blog {
    id: number;
    title: string;
    content: string;
    date: string;
    tags: string[];
    imgUrl: string;
    categories: string[];
    socialMedias: socialMedia[]
}

const BlogDetails = () => {
    const { id } = useParams();
    const [singleBlogData, setSingleBlogData] = useState<Blog | null>(null);
    console.log(id);


    useEffect(() => {
        if (id) {
            const projectId = Number(id);
            const singleData = BLOGS_DATA.find(project => project.id === projectId);
            setSingleBlogData(singleData || null);
        }
    }, [id]);


    console.log(singleBlogData);
    if (!singleBlogData) return <div>Loading...</div>;


    return (
        <div>
            <SingleBlogDetailsWrapper data={singleBlogData} />
        </div>
    )
}

export default BlogDetails
