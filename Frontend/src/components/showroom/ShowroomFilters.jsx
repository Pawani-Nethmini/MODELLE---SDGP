// filtering UI with search
// tasks: search bar, interactive dropdowns, emits filter state upward
import { useState } from "react";

export default function ShowroomFilters({ onChange, onSearch }) {
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <div className="showroom-filters-row">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search items (e.g., Vase,)"
          className="search-bar"
          onChange={(e) => onSearch(e.target.value)}
        />
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="showroom-filters">
        <div className="filter-group">
          <label className="filter-label">Material</label>
          <select
            className="filter-select"
            onFocus={() => setActiveFilter("material")}
            onBlur={() => setActiveFilter(null)}
            onChange={(e) => onChange({ material: e.target.value })}
          >
            <option value="">All Materials</option>
            <option value="PLA">PLA</option>
            <option value="ABS">ABS</option>
            <option value="Resin">Resin</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Print Type</label>
          <select
            className="filter-select"
            onFocus={() => setActiveFilter("type")}
            onBlur={() => setActiveFilter(null)}
            onChange={(e) => onChange({ print_type: e.target.value })}
          >
            <option value="">All Print Types</option>
            <option value="FDM">FDM</option>
            <option value="SLA">SLA</option>
            <option value="SLS">SLS</option>
          </select>
        </div>
      </div>
    </div>
  );
}
