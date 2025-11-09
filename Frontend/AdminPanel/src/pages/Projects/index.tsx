import { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import CategorySection from '../../components/Blogs/CategorySection';
// import CreateProjectSection from '../../components/Projects/CreateProjectSection';
import { getAllProjects, type ProjectBackResProps } from '../../api/projects';
import { getCategories } from '../../api/blog';
import SingleProject from '../../components/Projects/SingleProject';
import { useNavigate } from 'react-router';

const Projects = () => {
  // const [isNewCreate, setIsNewCreate] = useState(false);
  const [reload, setReload] = useState(0);
  const [projects, setProjects] = useState<ProjectBackResProps[] | null>(null);
  const [options, setOptions] = useState<any>(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; 

  const fetchProjects = async () => {
    const resProjects = await getAllProjects(currentPage, limit);
    const resCategories = await getCategories(1, 100);

    setOptions(resCategories.data);
    setProjects(resProjects.projects);
    setTotalPages(resProjects.pagination.totalPages || 1);

  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <CommonLayout>
      <div style={{ paddingBottom: '2rem' }}>
        <div className="headline-section">
          <h3 className="headline">Layihələr</h3>
          <button
            type="button"
            className="add-btn"
            // onClick={() => setIsNewCreate((prev) => !prev)}
            onClick={()=>navigate("/projects/create-new-project")}
          >
            Yeni Layihə
          </button>
        </div>

        <CategorySection />

        {/* {isNewCreate && (
          <CreateProjectSection
            setIsNewCreate={setIsNewCreate}
            setReload={setReload}
            options={options}
          />
        )} */}

        <div style={{ marginTop: '2rem' }}>
          <h3 className="font-semibold text-xl" style={{ marginBlock: '1.5rem' }}>
            Full Projects
          </h3>

          {projects &&
            projects.map((project: ProjectBackResProps) => (
              <SingleProject
                key={project.id}
                project={project}
                setReload={setReload}
                options={options}
              />
            ))}
        </div>

        {/*  Pagination  */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 " style={{ marginTop: "3rem" }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                padding: "8px 12px"
              }}
              className={`rounded-md border ${currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:)'
                }`}
            >
              ← Previous
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`rounded-md border ${currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:'
                }`}
              style={{
                padding: "8px 12px"
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default Projects;
