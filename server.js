const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const participantRoutes = require('./routes/participantRoutes');
const sequelize = require('./config/database');
const { syncDatabase } = require('./models'); // Importa a função para sincronizar o banco

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/participants', participantRoutes);

// Função para iniciar o servidor
const startServer = async () => {
    try {
        // Sincroniza o banco de dados antes de iniciar o servidor
        await syncDatabase();
        console.log('Banco de dados sincronizado com sucesso.');

        // Inicia o servidor após a sincronização do banco
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados ou iniciar o servidor:', error);
        process.exit(1); // Encerra o processo em caso de erro crítico
    }
};

// Inicia o servidor
startServer();
