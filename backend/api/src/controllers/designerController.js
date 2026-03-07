import DesignerProfile from "../models/DesignerProfiles.js";

export const getDesigners = async (req, res) => {
  try {
    const { search = "", skill = "" } = req.query;

    const query = {
      isAvailable: true,
      ...(search && {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
          { bio: { $regex: search, $options: "i" } },
        ],
      }),
      ...(skill && { skills: { $in: [skill] } }),
    };

    const designers = await DesignerProfile.find(query).sort({ rating: -1, completedProjects: -1 });
    res.json(designers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch designers", error: error.message });
  }
};

export const seedDesigner = async (req, res) => {
  try {
    const designer = await DesignerProfile.create(req.body);
    res.status(201).json(designer);
  } catch (error) {
    res.status(500).json({ message: "Failed to create designer", error: error.message });
  }
};