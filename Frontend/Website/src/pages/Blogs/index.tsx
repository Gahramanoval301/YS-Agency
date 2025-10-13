// import styles from "./Blogs.module.scss"

import BlogsWrapper from "../../components/Blogs/BlogsWrapper"
import MainLayout from "../../layouts/HeroSection"

const Blogs = () => {
    return (
        <div>
            <MainLayout title="Blog">
                <BlogsWrapper/>
            </MainLayout>
        </div>
    )
}

export default Blogs
