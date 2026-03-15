// to the python STL validator microservice
// fastAPI recieves stl file and printer id
// import FormData from "form-data";

export async function validateSTL(file, printerId) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("printer_id", printerId);

  const response = await fetch("http://localhost:8000/validate", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to validate STL: ${response.status}`);
  }

  return response.json();
}

export async function autofixSTL(fileBuffer, fileName) {
  const formData = new FormData();
  formData.append("file", new Blob([fileBuffer]), fileName);
  
  const response = await fetch("http://localhost:8000/autofix", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to autofix STL: ${response.status}`);
  }

  return response.arrayBuffer();

  
}