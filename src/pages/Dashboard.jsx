import { ProjectList } from "../components";
import { useCollection } from "../hooks/useCollection";

function Dashboard() {
  const { document } = useCollection("projects");
  return (
    <div className="mt-16">
      <h2 className="mb-10 text-3xl font-medium">Dashboard</h2>
      {document && <ProjectList projects={document} />}
    </div>
  );
}

export default Dashboard;
