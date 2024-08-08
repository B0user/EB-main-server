const University = require('../models/UniversitySchema');

const createUniversity = async (req, res) => {
    try {
        const university = new University(req.body);
        await university.save();
        res.status(201).json(university);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const getAllUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) return res.status(404).json({ message: 'University not found' });
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!university) return res.status(404).json({ message: 'University not found' });
        res.json(university);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndDelete(req.params.id);
        if (!university) return res.status(404).json({ message: 'University not found' });
        res.json({ message: 'University deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUniversity,
    getAllUniversities,
    getUniversityById,
    updateUniversity,
    deleteUniversity
};
