import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { ProjectComment, ProjectSummary } from "../components";

function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);
  console.log(document);
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="mt-16 grid grid-cols-2 gap-4">
      <ProjectSummary project={document} />
      <ProjectComment project={document} />
    </div>
  );
}

export default Project;
