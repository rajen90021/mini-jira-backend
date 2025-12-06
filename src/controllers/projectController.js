const Project = require('../models/projectModel');

// @desc    Get all projects
// @route   GET /api/projects/all
// @access  Public
const getProjects = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'desc' } = req.query;

        const query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        const total = await Project.countDocuments(query);
        const projects = await Project.find(query)
            .populate('managerId', 'name email')
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum);

        res.status(200).json({
            projects,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
        });
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
            // Only update name if it's different to avoid duplicate key error
            if (req.body.name && req.body.name !== project.name) {
                project.name = req.body.name;
            }
            project.description = req.body.description || project.description;
            project.status = req.body.status || project.status;
            project.startDate = req.body.startDate || project.startDate;
            project.endDate = req.body.endDate || project.endDate;
            project.managerId = req.body.managerId || project.managerId;

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
