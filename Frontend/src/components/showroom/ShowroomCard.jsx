// represent one printed model
// shows image, material, print type, color

export default function ShowroomCard({ item }) {
  return (
    <div className="showroom-card">
      <div className="image-wrap">
        <img
          src={item.imageUrl}
          alt={item.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/Modelle-logo.png";
          }}
        />
        <div className="price-badge">{item.price ? `LKR ${item.price}` : "—"}</div>
        <button className="fav-btn" aria-label="favorite">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21s-7-4.35-9-7.09C1.6 10.95 4.12 6 7.5 6c1.96 0 3.2 1.23 4.5 2.9C12.3 7.23 13.54 6 15.5 6 18.88 6 21.4 10.95 21 13.91 19 16.65 12 21 12 21z" fill="white" opacity="0.95"/>
          </svg>
        </button>
      </div>

      <h3 className="title">{item.title}</h3>
      <p className="meta">{item.material} · {item.printType}</p>
      <div className="meta-row">
        <p className="author">by {item.printerId || "Community"}</p>
        <p className="color">{item.color}</p>
      </div>
    </div>
  );
}
