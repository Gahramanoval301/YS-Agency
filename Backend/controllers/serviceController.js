// const { uploadImage } = require("../config/imagekit");
// const imagekit = require("../config/imagekit"); // ensure imagekit.deleteFile works
const { Service } = require("../models");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [["createdAt", "DESC"]], // latest first
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { title, includes } = req.body;
    const newService = await Service.create({ title, includes });
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, includes } = req.body;

    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.title = title ?? service.title;
    service.includes = includes ?? service.includes;
    await service.save();

    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    await service.destroy();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};
