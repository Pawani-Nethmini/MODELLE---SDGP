// to the python STL validator microservice
// fastAPI recieves stl file and printer id
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export async function validateSTL(filePath, printerId) {
  const formData = new FormData();

  formData.append("stl_file", fs.createReadStream(filePath));
  formData.append("printer_id", printerId);

//   send post request to fastAPI microservice
  const response = await axios.post(
    "http://localhost:8000/validate",
    formData,
    {
      headers: formData.getHeaders(),
      timeout: 30000
    }
  );

  return response.data;
}
