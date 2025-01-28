const { Participant } = require('../models');

// Confirmar ou recusar presença
exports.updateParticipantStatus = async (req, res) => {
    try {
        const { eventId, status } = req.body;
        const participant = await Participant.findOne({ where: { eventId, userId: req.userId } });
        if (!participant) {
            return res.status(404).json({ message: 'Participante não encontrado.' });
        }

        participant.status = status;
        await participant.save();
        res.json(participant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};