// this is the brain of the feature



// import { useEffect, useState } from "react";
// import ShowroomCard from "../components/ShowroomCard";
// import ShowroomFilters from "../components/ShowroomFilters";

// export default function ShowroomPage() {
//   const [items, setItems] = useState([]);
//   const [filters, setFilters] = useState({});

//   useEffect(() => {
//     const params = new URLSearchParams(filters).toString();
//     fetch(`http://127.0.0.1:8002/showroom?${params}`)
//       .then(res => res.json())
//       .then(data => setItems(data));
//   }, [filters]);

//   return (
//     <>
//       <h1>Community Showcase & Marketplace</h1>

//       <ShowroomFilters onChange={setFilters} />

//       <div className="grid">
//         {items.map(item => (
//           <ShowroomCard key={item.id} item={item} />
//         ))}
//       </div>

//       <button onClick={() => window.location.href="/printer-login"}>
//         Upload your printed model to the showroom
//       </button>
//     </>
//   );
// }




import { useEffect, useState, useMemo } from "react";
import ShowroomGrid from "../../components/showroom/ShowroomGrid";
import ShowroomFilters from "../../components/showroom/ShowroomFilters";
import UploadModal from "../../components/showroom/UploadModal";
import "../../styles/showroom.css";
import { fetchShowroomItems } from "../../services/showroomService";

export default function ShowroomPage() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchShowroomItems(filters)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [filters]);

  // Client-side filtering by search term (title/name)
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  return (
    <div className="showroom-page">
      <div className="showroom-hero">
        <div className="hero-content">
          <h1 className="hero-title">Explore the Frontiers of 3D Printing</h1>
          <p className="hero-subtitle">Discover incredible creations from our community or showcase your own masterpieces.</p>
          <button className="upload-work-btn" onClick={() => setShowUploadModal(true)}>
            Upload Your Work
          </button>
        </div>
        <div className="hero-glow"></div>
      </div>

      <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />

      <div className="showroom-content">
        <ShowroomFilters onChange={setFilters} onSearch={setSearch} />

        {loading ? (
          <p>Loading showroom...</p>
        ) : (
          <ShowroomGrid items={filteredItems} />
        )}
      </div>
    </div>
  );
}
