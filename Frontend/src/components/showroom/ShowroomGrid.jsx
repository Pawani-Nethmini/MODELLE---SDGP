// layout manager for showroom items
// Receives items[] as props
//Displays grid (CSS grid / flex)
//Renders multiple ShowroomCard

import ShowroomCard from "./ShowroomCard";

export default function ShowroomGrid({ items }) {
  if (!items.length) {
    return <p>No items found.</p>;
  }

  return (
    <div className="showroom-panel">
      <div className="showroom-grid">
        {items.map((item) => (
          <ShowroomCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
