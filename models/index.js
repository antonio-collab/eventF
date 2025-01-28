const sequelize = require('../config/database'); 
const User = require('./User');
const Event = require('./Event');
const Participant = require('./Participant');

// Relacionamentos
User.hasMany(Event, { foreignKey: 'userId' });
Event.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Participant, { foreignKey: 'eventId' });
Participant.belongsTo(Event, { foreignKey: 'eventId' });

User.hasMany(Participant, { foreignKey: 'userId' });
Participant.belongsTo(User, { foreignKey: 'userId' });

// Sincronizar modelos com o banco de dados
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true}); // Use { force: true } apenas se realmente precisar recriar as tabelas
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
        process.exit(1); // Encerra o processo em caso de erro
    }
};

module.exports = { User, Event, Participant, syncDatabase };
