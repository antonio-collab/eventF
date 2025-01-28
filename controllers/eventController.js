const { Event, Participant } = require('../models');
const axios = require('axios');

// Criar um novo evento
exports.createEvent = async (req, res) => {
    try {
        const { name, date, time, location, description } = req.body;
        const event = await Event.create({ name, date, time, location, description, userId: req.userId });
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Listar eventos (passados e próximos)
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            where: { userId: req.userId },
            include: Participant,
        });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Integração com Google Maps para obter coordenadas do local
exports.getLocationCoordinates = async (req, res) => {
    try {
        const { location } = req.query;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
        res.json(response.data.results[0].geometry.location);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};