import { useState } from "react";

const filterList = [
  "All",
  "Mine",
  "Frotnend",
  "Backend",
  "Copywriting",
  "Design",
  "Marketing",
  "Management",
  "Other",
];

function DashboardFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState("All");

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {filterList.map((filter) => (
        <button
          key={filter}
          role="tab"
          className={`tab ${currentFilter === filter ? "tab-active" : ""}`}
          onClick={() => {
            setCurrentFilter(filter);
            changeFilter(filter.toLowerCase());
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default DashboardFilter;
