import { useParams } from "react-router";
// import styles from "./ProjectDetails.module.scss"
import { useEffect, useState } from "react";
import { PROJECTS_DATA } from "../../components/Projects/ProjectsWrapper";
import ProjectDetailsWrapper from "../../components/ProjectDetailsWrapper/ProjectDetailsWrapper";

export interface Project {
  id: number;
  projectImgUrl: string;
  title: string;
  description: string;
}


const ProjectDetailsPage = () => {
  const { id } = useParams(); // id comes from the URL
  const [singleProjectData, setSingleProjectData] = useState<Project | null>(null);
  console.log(id);


  useEffect(() => {
    if (id) {
      const projectId = Number(id);
      const singleData = PROJECTS_DATA.find(project => project.id === projectId);
      setSingleProjectData(singleData || null);
    }
  }, [id]);


  console.log(singleProjectData);
  if (!singleProjectData) return <div>Loading...</div>;



  return (
    <div>
      <ProjectDetailsWrapper projectData={singleProjectData}>
      </ProjectDetailsWrapper>

    </div>
  )
}

export default ProjectDetailsPage
