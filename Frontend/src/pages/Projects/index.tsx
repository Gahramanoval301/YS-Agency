
import styles from "./Projects.module.scss"
import MainLayout from '../../layouts/HeroSection'
import ProjectsWrapper from '../../components/Projects/ProjectsWrapper'

const Projects = () => {
  return (
    <MainLayout title={"Layihelerimiz"}>
      <ProjectsWrapper/>
    </MainLayout>
  )
}

export default Projects
