const Project = require('../models/projectModel');

// @desc    Get all projects
// @route   GET /api/projects/all
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single project
// @route   GET /api/projects/get?projectId=
// @access  Public
const getProjectById = async (req, res) => {
    try {
        const projectId = req.query.projectId;
        if (!projectId) {
            return res.status(400).json({ message: 'Project ID is required' });
        }
        const project = await Project.findById(projectId);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects/create
// @access  Public
const createProject = async (req, res) => {
    const {
        name,
        managerId,
        description,
        status,
        startDate,
        endDate,
    } = req.body;

    try {
        const project = await Project.create({
            name,
            managerId,
            description,
            status,
            startDate,
            endDate,
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/update?projectId=
// @access  Public
const updateProject = async (req, res) => {
    try {
        const projectId = req.query.projectId;
        if (!projectId) {
            return res.status(400).json({ message: 'Project ID is required' });
        }

        const project = await Project.findById(projectId);

        if (project) {
            project.name = req.body.name || project.name;
            project.description = req.body.description || project.description;
            project.status = req.body.status || project.status;
            project.startDate = req.body.startDate || project.startDate;
            project.endDate = req.body.endDate || project.endDate;

            const updatedProject = await project.save();
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/delete?projectId=
// @access  Public
const deleteProject = async (req, res) => {
    try {
        const projectId = req.query.projectId;
        if (!projectId) {
            return res.status(400).json({ message: 'Project ID is required' });
        }

        const project = await Project.findById(projectId);

        if (project) {
            await project.deleteOne();
            res.status(200).json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};
