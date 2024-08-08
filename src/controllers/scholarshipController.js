const Scholarship = require('../models/ScholarshipSchema');

const createScholarship = async (req, res) => {
    try {
        const scholarship = new Scholarship(req.body);
        await scholarship.save();
        res.status(201).json(scholarship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find().populate('universities');
        res.json(scholarships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getScholarshipById = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id).populate('universities');
        if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
        res.json(scholarship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
        res.json(scholarship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
        if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
        res.json({ message: 'Scholarship deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createScholarship,
    getAllScholarships,
    getScholarshipById,
    updateScholarship,
    deleteScholarship
};
