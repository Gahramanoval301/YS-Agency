
// import styles from "./Projects.module.scss"
import MainLayout from '../../layouts/HeroSection'
import ProjectsWrapper from '../../components/Projects/ProjectsWrapper'
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t("projects")}>
      <ProjectsWrapper />
    </MainLayout>
  )
}

export default Projects
