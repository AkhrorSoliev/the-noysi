function ProjectSummary({ project }) {
  const { name, createdBy, dueDate, details, assignedUsersList } = project;
  return (
    <div className="h-full rounded-md bg-white p-5">
      <h5 className="mb-1 text-xl font-semibold">{name}</h5>
      <p className="mb-1 text-sm italic text-neutral text-opacity-60">
        By {createdBy.displayName}
      </p>
      <p className="mb-10 text-sm text-neutral text-opacity-60">
        Project due by {dueDate.toDate().toDateString()}
      </p>
      <p className="mb-5 text-base-content">{details}</p>
      <hr className="mb-1" />
      <h4 className="text-md mb-1 font-semibold">Project is assigned to:</h4>
      <div className="avatar-group -space-x-3 rtl:space-x-reverse">
        {assignedUsersList.map((user) => {
          return (
            <div key={user.id} className="avatar">
              <div className="w-10">
                <img src={user.photoURL} alt={`${user.displayName} avatar`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectSummary;
