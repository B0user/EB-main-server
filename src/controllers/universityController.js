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
        // Extract and normalize the query parameters
        console.log(req.query);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status_tag = req.query.statusFilter || null;
        console.log('1');
        // Create a filter object based on status_tag if provided
        const filter = {};
        if (status_tag && status_tag !== 'Все') {
            filter.status_tag = status_tag;
        }

        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch the universities with the given filter, limit, and skip
        const universities = await University.find(filter)
            .skip(skip)
            .limit(limit);
        console.log(universities.length);
        // Get the total count of universities with the given filter
        const totalUniversities = await University.countDocuments(filter);

        res.json({
            universities,
            totalPages: Math.ceil(totalUniversities / limit),
            currentPage: page,
        });
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
