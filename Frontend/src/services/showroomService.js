// ALL showroom backend calls

const BASE_URL = "http://127.0.0.1:8002"; // showroom backend port

export async function fetchShowroomItems(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const url = query ? `${BASE_URL}/showroom?${query}` : `${BASE_URL}/showroom`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch showroom items");
  }

  const data = await res.json();

  // normalize backend snake_case keys to frontend camelCase
  return data.map((it) => ({
    id: it.id,
    title: it.title,
    imageUrl: it.image_url || it.imageUrl || "",
    material: it.material,
    printType: it.print_type || it.printType || "",
    color: it.color,
    price: it.price,
    category: it.category || "",
    printerId: it.printer_id || it.printerId,
  }));
}

export async function uploadShowroomItem(formData) {
  const res = await fetch(`${BASE_URL}/showroom/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to upload item");
  }

  const data = await res.json();
  return data;
}
