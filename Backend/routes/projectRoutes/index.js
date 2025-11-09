const express = require("express");
const router = express.Router();

const {
  createProject,
  getSingleProject,
  getAllProjects,
  deleteProject,
  updateProject,
  getProjectSmallData,
} = require("../../controllers/projectController");

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/small-data", getProjectSmallData);
router.get("/:idOrSlug", getSingleProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
