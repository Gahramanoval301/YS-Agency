import { useParams } from 'react-router';
import SingleBlogDetailsWrapper from '../../components/BlogDetails/SingleBlogDetailsWrapper'
import { useEffect, useState } from 'react';
import { getSingleBlog } from '../../api/blog';

interface socialMedia {
    type: string;
    link: string;
}

import type { BlogProps } from '../../api/blog';
import { useTranslation } from 'react-i18next';

export interface Blog extends BlogProps {
    socialMedias: socialMedia[]
}

const BlogDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [singleBlogData, setSingleBlogData] = useState<Blog | null>(null);
    console.log(id);


    const fetchSingleBlog = async () => {
        const singleBlogData = await getSingleBlog(id || "");
        setSingleBlogData(singleBlogData)
        console.log(singleBlogData);

    }

    useEffect(() => {
        if (id) {
            fetchSingleBlog();
            // const projectId = Number(id);
            // const singleData = BLOGS_DATA.find(project => project.id === projectId);
            // setSingleBlogData(singleData || null);
        }
    }, [id]);


    console.log(singleBlogData);
    if (!singleBlogData) return <div>{t("loading")}...</div>;


    return (
        <div>
            <SingleBlogDetailsWrapper data={singleBlogData} />
        </div>
    )
}

export default BlogDetails
