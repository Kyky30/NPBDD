const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Tentative de connexion à MongoDB...');
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/projetNPBDD';
        console.log('URL de connexion:', mongoURI);
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`MongoDB connecté: ${conn.connection.host}`);
        console.log('Base de données:', conn.connection.name);
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 