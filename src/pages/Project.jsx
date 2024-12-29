import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { ProjectComment, ProjectSummary } from "../components";

function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="mt-16 flex items-start gap-5">
      <ProjectSummary project={document} />
      <ProjectComment project={document} />
    </div>
  );
}

export default Project;
