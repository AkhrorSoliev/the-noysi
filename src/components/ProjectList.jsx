import { Link } from "react-router-dom";

function ProjectList({ projects }) {
  return (
    <div>
      {projects.length === 0 && <p className="text-xl">No projects yet!</p>}
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {projects.map((project) => {
          const { name, dueDate, assignedUsersList } = project;
          return (
            <Link key={project.id} to={`/project/${project.id}`}>
              <div className="tranistion-all card w-full bg-base-100 shadow-xl duration-300 hover:shadow-2xl">
                <div className="card-body p-5">
                  <h3 className="mb-4 text-2xl font-semibold">{name}</h3>
                  <p className="mb-2 text-neutral-content">
                    Due by: {dueDate.toDate().toDateString()}
                  </p>
                  <hr className="mb-4" />
                  <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                    {assignedUsersList.map((user) => {
                      return (
                        <div key={user.id} className="avatar">
                          <div className="w-10">
                            <img
                              src={user.photoURL}
                              alt={`${user.displayName} avatar`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectList;
