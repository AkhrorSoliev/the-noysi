import { Link } from "react-router-dom";
import { motion } from "motion/react";

function ProjectCard({ project }) {
  const { name, dueDate, assignedUsersList } = project;

  return (
    <Link key={project.id} to={`/project/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
        }}
      >
        <div className="tranistion-all card w-full bg-base-100 shadow-xl duration-300 hover:shadow-2xl">
          <div className="card-body p-5">
            <h3 className="mb-4 line-clamp-1 text-2xl font-semibold">{name}</h3>
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
      </motion.div>
    </Link>
  );
}

export default ProjectCard;
