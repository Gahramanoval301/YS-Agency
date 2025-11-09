const {
  Project,
  Category,
  PhotoDescSection,
  VideoDescSection,
  PhotoGallerySection,
  VideoGallerySection,
} = require("../models");
const slugify = require("slugify");
const { Op } = require("sequelize");
const { deleteImages } = require("../config/imagekit");

const createProject = async (req, res) => {
  try {
    const {
      title,
      content,
      imgUrl,
      headline,
      imgFileId,
      categoryIds = [], // ✅ renamed
      photoDescSections = [], // ✅ renamed
      videoDescSections = [],
      photoGallerySections = [],
      videoGallerySections = [],
      sectionImages = [
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },
      ],
    } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    // 1️⃣ Create the project
    const project = await Project.create({
      title,
      headline,
      content,
      imgUrl,
      imgFileId,
      sectionImages,
      slug: slugify(title, { lower: true, strict: true }),
    });

    // 2️⃣ Connect categories (many-to-many)
    if (categoryIds.length > 0) {
      const categories = await Category.findAll({
        where: { id: categoryIds },
      });
      await project.setCategories(categories);
    }

    // 3️⃣ Create 1-to-many sections
    if (photoDescSections.length > 0) {
      const photos = photoDescSections.map((item) => ({
        ...item,
        projectId: project.id,
      }));
      await PhotoDescSection.bulkCreate(photos);
    }

    if (videoDescSections.length > 0) {
      const videos = videoDescSections.map((item) => ({
        ...item,
        projectId: project.id,
      }));
      await VideoDescSection.bulkCreate(videos);
    }

    if (photoGallerySections.length > 0) {
      const photos = photoGallerySections.map((item) => ({
        ...item,
        projectId: project.id,
      }));
      await PhotoGallerySection.bulkCreate(photos);
    }

    if (videoGallerySections.length > 0) {
      const videos = videoGallerySections.map((item) => ({
        ...item,
        projectId: project.id,
      }));
      await VideoGallerySection.bulkCreate(videos);
    }

    // 4️⃣ Return created project with full relations
    const createdProject = await Project.findByPk(project.id, {
      include: [
        { model: Category, as: "categories", through: { attributes: [] } },
        { model: PhotoDescSection, as: "photoDescSections" },
        { model: VideoDescSection, as: "videoDescSections" },
        { model: PhotoGallerySection, as: "photoGallerySections" },
        { model: VideoGallerySection, as: "videoGallerySections" },
      ],
    });

    res.status(201).json(createdProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      headline,
      content,
      imgUrl,
      imgFileId,
      categoryIds, // optional
      photoDescSections,
      videoDescSections,
      photoGallerySections,
      videoGallerySections,
      sectionImages,
    } = req.body;

    // 1️⃣ Find the project
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // 2️⃣ Update basic fields (only if provided)
    await project.update({
      title: title ?? project.title,
      headline: headline ?? project.headline,
      content: content ?? project.content,
      imgUrl: imgUrl ?? project.imgUrl,
      sectionImages: sectionImages ?? project.sectionImages, 
      imgFileId: imgFileId ?? project.imgFileId,
      slug: title
        ? slugify(title, { lower: true, strict: true })
        : project.slug,
    });

    // 3️⃣ Update categories (many-to-many)
    if (categoryIds !== undefined) {
      const categories = await Category.findAll({
        where: { id: categoryIds },
      });
      await project.setCategories(categories); // replaces existing associations
    }

    // 4️⃣ Update one-to-many sections only if provided
    const updateSections = async (Model, items) => {
      if (!items) return; // skip if not provided

      // Remove all existing sections for this project
      await Model.destroy({ where: { projectId: id } });

      // Create new sections
      const newItems = items.map((item) => ({ ...item, projectId: id }));
      await Model.bulkCreate(newItems);
    };

    if (photoDescSections !== undefined)
      await updateSections(PhotoDescSection, photoDescSections);

    if (videoDescSections !== undefined)
      await updateSections(VideoDescSection, videoDescSections);

    if (photoGallerySections !== undefined)
      await updateSections(PhotoGallerySection, photoGallerySections);

    if (videoGallerySections !== undefined)
      await updateSections(VideoGallerySection, videoGallerySections);

    // 5️⃣ Return updated project with relations
    const updatedProject = await Project.findByPk(id, {
      include: [
        { model: Category, as: "categories", through: { attributes: [] } },
        { model: PhotoDescSection, as: "photoDescSections" },
        { model: VideoDescSection, as: "videoDescSections" },
        { model: PhotoGallerySection, as: "photoGallerySections" },
        { model: VideoGallerySection, as: "videoGallerySections" },
      ],
    });

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    let { category, limit = 10, page = 1 } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    const offset = (parsedPage - 1) * parsedLimit;

    const whereClause = {};

    // ✅ Step 1: Filter projects by category (same logic as blogs)
    if (category) {
      const projectsWithCategory = await Project.findAll({
        include: [
          {
            model: Category,
            as: "categories",
            attributes: [],
            where: { id: category },
            through: { attributes: [] },
          },
        ],
        attributes: ["id"],
      });

      const projectIds = projectsWithCategory.map((p) => p.id);
      whereClause.id = { [Op.in]: projectIds.length ? projectIds : [null] }; // handle no match
    }

    // ✅ Step 2: Fetch full projects with all related models
    const { rows: projects, count: totalProjects } =
      await Project.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Category,
            as: "categories",
            attributes: ["id", "title"],
            through: { attributes: [] },
          },
          { model: PhotoDescSection, as: "photoDescSections" },
          { model: VideoDescSection, as: "videoDescSections" },
          { model: PhotoGallerySection, as: "photoGallerySections" },
          { model: VideoGallerySection, as: "videoGallerySections" },
        ],
        distinct: true,
        limit: parsedLimit,
        offset,
        order: [["createdAt", "DESC"]],
      });

    // ✅ Step 3: Return paginated result
    res.status(200).json({
      projects,
      pagination: {
        totalProjects,
        totalPages: Math.ceil(totalProjects / parsedLimit),
        currentPage: parsedPage,
        limit: parsedLimit,
      },
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getProjectSmallData = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    const offset = (parsedPage - 1) * parsedLimit;

    // Fetch only essential fields with pagination
    const { rows: projects, count: totalProjects } =
      await Project.findAndCountAll({
        attributes: ["id", "title", "headline", "imgUrl", "content"],
        limit: parsedLimit,
        offset,
        order: [["createdAt", "DESC"]],
      });

    res.status(200).json({
      projects,
      pagination: {
        totalItems: totalProjects,
        totalPages: Math.ceil(totalProjects / parsedLimit),
        currentPage: parsedPage,
        pageSize: parsedLimit,
      },
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getSingleProject = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const project = await Project.findOne({
      where: {
        [Op.or]: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: [
        { model: Category, as: "categories", through: { attributes: [] } },
        { model: PhotoDescSection, as: "photoDescSections" },
        { model: VideoDescSection, as: "videoDescSections" },
        { model: PhotoGallerySection, as: "photoGallerySections" },
        { model: VideoGallerySection, as: "videoGallerySections" },
      ],
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        { model: PhotoDescSection, as: "photoDescSections" },
        { model: VideoDescSection, as: "videoDescSections" },
        { model: PhotoGallerySection, as: "photoGallerySections" },
        { model: VideoGallerySection, as: "videoGallerySections" },
      ],
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    // Gather all fileIds
    const fileIds = [
      project.imgFileId,
      ...project.photoDescSections.map((p) => p.imgFileId),
      ...project.videoDescSections.map((v) => v.imgFileId),
      ...project.photoGallerySections.map((p) => p.imgFileId),
      ...project.videoGallerySections.map((v) => v.imgFileId),
    ].filter(Boolean); // remove undefined/null

    await deleteImages(fileIds);

    await project.destroy();

    res
      .status(200)
      .json({ message: "Project and all images deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  getSingleProject,
  getProjectSmallData,
  deleteProject,
};
