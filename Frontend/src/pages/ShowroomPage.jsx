import { useEffect, useState } from "react";
import ShowroomCard from "../components/ShowroomCard";
import ShowroomFilters from "../components/ShowroomFilters";

export default function ShowroomPage() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    fetch(`http://127.0.0.1:8002/showroom?${params}`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, [filters]);

  return (
    <>
      <h1>Community Showcase & Marketplace</h1>

      <ShowroomFilters onChange={setFilters} />

      <div className="grid">
        {items.map(item => (
          <ShowroomCard key={item.id} item={item} />
        ))}
      </div>

      <button onClick={() => window.location.href="/printer-login"}>
        Upload your printed model to the showroom
      </button>
    </>
  );
}
