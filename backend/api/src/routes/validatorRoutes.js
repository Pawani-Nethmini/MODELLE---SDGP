import express, { response } from "express";
import multer from "multer";
import FormData from "form-data";
import axios from "axios";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/validate", upload.single("file"), async (req, res) => {
        console.log("FILE:", req.file);
        console.log("BODY:", req.body);
    try {
        const formData = new FormData();
        formData.append("file", fs.createReadStream(req.file.path), req.file.originalname );

        const response = await axios.post("http://localhost:8000/validate", formData, {
            headers: formData.getHeaders(),
            // responseType: "arraybuffer",
        });

        // res.set("Content-Type", "application/octet-stream");
        // res.set("Content-Disposition", `attachment; filename="repaired.stl"`);
        // res.send(Buffer.from(response.data));
        res.json(response.data);
    } catch (error) {
        console.error("Error validating STL:", error);
        res.status(500).json({ error: error.message });
    } finally {
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
});

export default router;