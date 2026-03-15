// filtering UI with search
// tasks: search bar, interactive dropdowns, emits filter state upward

export default function ShowroomFilters({ filters, onChange, onSearch }) {

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters };
    if (value === "") {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onChange(newFilters);
  };

  return (
    <div className="showroom-filters-row">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search items (e.g., Vase)"
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
            value={filters.material || ""}
            onChange={(e) => handleFilterChange("material", e.target.value)}
          >
            <option value="">All Materials</option>
            <option value="PLA">PLA</option>
            <option value="ABS">ABS</option>
            <option value="PETG">PETG</option>
            <option value="TPU">TPU</option>
            <option value="Nylon">Nylon</option>
            <option value="Resin">Resin</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Print Type</label>
          <select
            className="filter-select"
            value={filters.print_type || ""}
            onChange={(e) => handleFilterChange("print_type", e.target.value)}
          >
            <option value="">All Print Types</option>
            <option value="FDM">FDM</option>
            <option value="SLA">SLA</option>
            <option value="SLS">SLS</option>
            <option value="DLP">DLP</option>
            <option value="ABS">ABS</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Color</label>
          <select
            className="filter-select"
            value={filters.color || ""}
            onChange={(e) => handleFilterChange("color", e.target.value)}
          >
            <option value="">All Colors</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Transparent">Transparent</option>
            <option value="Yellow">Yellow</option>
            <option value="Orange">Orange</option>
            <option value="Green">Green</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            className="filter-select"
            value={filters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All Category Types</option>
            <option value="Toys">Toys</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Furniture">Furniture</option>
            <option value="Prototypes">Prototypes</option>
            <option value="Medical">Medical</option>
            <option value="Jewellery">Jewellery</option>
          </select>
        </div>
      </div>
    </div>
  );
}
