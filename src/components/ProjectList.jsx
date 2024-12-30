import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

function ProjectList({ projects }) {
  return (
    <>
      {projects.length === 0 && (
        <div className="my-10 flex flex-col items-center gap-5">
          <p className="text-center text-xl italic opacity-40">
            No projects yet!
          </p>
          <div>
            <Link to="/create" className="btn btn-outline btn-primary btn-sm">
              <IoMdAdd /> Create
            </Link>
          </div>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {projects.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </div>
    </>
  );
}

export default ProjectList;
