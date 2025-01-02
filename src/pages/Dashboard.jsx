import { useState } from "react";
import { DashboardFilter, ProjectList } from "../components";
import { useCollection } from "../hooks/useCollection";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Dashboard() {
  const { document } = useCollection("projects");
  const { user } = useGlobalContext();
  const [filter, setFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const projects = document
    ? document.filter((doc) => {
        switch (filter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            doc.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "frontend":
          case "backend":
          case "copywriting":
          case "design":
          case "marketing":
          case "management":
          case "other":
            return doc.category.toLowerCase() === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="mt-16">
      <h2 className="mb-10 text-3xl font-medium">Dashboard</h2>
      <DashboardFilter changeFilter={changeFilter} />
      {document && <ProjectList projects={projects} />}
    </div>
  );
}

export default Dashboard;
