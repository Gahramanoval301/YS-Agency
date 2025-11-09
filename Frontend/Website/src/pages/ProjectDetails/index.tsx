import { useParams } from "react-router";
// import styles from "./ProjectDetails.module.scss"
import { useEffect, useState } from "react";
import ProjectDetailsWrapper from "../../components/ProjectDetailsWrapper/ProjectDetailsWrapper";
import { getSingleProject, type ProjectBackResProps } from "../../api/project";
import { useTranslation } from "react-i18next";

export interface Project extends ProjectBackResProps { }


const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [singleProjectData, setSingleProjectData] = useState<Project | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProjectData = async () => {
      if (id) {
        const resSingleData = await getSingleProject(id);
        setSingleProjectData(resSingleData || null);
      }
    };
    fetchProjectData();
  }, [id]);


  console.log(singleProjectData);
  if (!singleProjectData) return <div>{t("loading")}...</div>;

  return (
    <div>
      <ProjectDetailsWrapper projectData={singleProjectData}>
      </ProjectDetailsWrapper>

    </div>
  )
}

export default ProjectDetailsPage
