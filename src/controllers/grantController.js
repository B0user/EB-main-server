const Grant = require('../models/GrantSchema');

const createGrant = async (req, res) => {
    try {
        const grant = new Grant(req.body);
        await grant.save();
        res.status(201).json(grant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllGrants = async (req, res) => {
    try {
        const grants = await Grant.find().populate('universities');
        res.json(grants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGrantById = async (req, res) => {
    try {
        const grant = await Grant.findById(req.params.id).populate('universities');
        if (!grant) return res.status(404).json({ message: 'Grant not found' });
        res.json(grant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGrant = async (req, res) => {
    try {
        const grant = await Grant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grant) return res.status(404).json({ message: 'Grant not found' });
        res.json(grant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteGrant = async (req, res) => {
    try {
        const grant = await Grant.findByIdAndDelete(req.params.id);
        if (!grant) return res.status(404).json({ message: 'Grant not found' });
        res.json({ message: 'Grant deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGrant,
    getAllGrants,
    getGrantById,
    updateGrant,
    deleteGrant
};
