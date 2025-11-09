// import styles from "./Blogs.module.scss"

import { useTranslation } from "react-i18next";
import BlogsWrapper from "../../components/Blogs/BlogsWrapper"
import MainLayout from "../../layouts/HeroSection"

const Blogs = () => {
    const { t } = useTranslation();

    return (
        <div>
            <MainLayout title={t("blog")}>
                <BlogsWrapper />
            </MainLayout>
        </div>
    )
}

export default Blogs
