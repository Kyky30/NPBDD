require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const tasksRouter = require('./routes/tasks');
const Task = require('./models/Task');

const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Route de test pour créer une tâche
app.get('/test', async (req, res) => {
  try {
    const testTask = new Task({
      titre: 'Tâche de test',
      description: 'Cette tâche a été créée automatiquement pour tester la connexion',
      dateCreation: new Date(),
      echeance: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Dans 7 jours
      statut: 'à faire',
      priorite: 'moyenne',
      categorie: 'test',
      auteur: {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com'
      },
      etiquettes: ['test', 'initialisation']
    });

    await testTask.save();
    console.log('Tâche de test créée avec succès');
    res.json({ message: 'Tâche de test créée avec succès', task: testTask });
  } catch (error) {
    console.error('Erreur lors de la création de la tâche de test:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la tâche de test', error: error.message });
  }
});

// Routes
app.use('/api/tasks', tasksRouter);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'API de gestion des tâches' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(500).json({ 
    message: 'Une erreur est survenue!',
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Gestion des routes non trouvées
app.use((req, res) => {
  console.log('Route non trouvée:', req.url);
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`URL de l'API: http://localhost:${PORT}`);
}); 