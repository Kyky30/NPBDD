const mongoose = require('mongoose');

const sousTacheSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    statut: { 
        type: String, 
        enum: ['à faire', 'en cours', 'terminée', 'annulée'],
        default: 'à faire'
    },
    echeance: { type: Date }
});

const commentaireSchema = new mongoose.Schema({
    texte: {
        type: String,
        required: true
    },
    auteur: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const taskSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now },
    echeance: { type: Date, required: true },
    statut: { 
        type: String, 
        enum: ['à faire', 'en cours', 'terminée', 'annulée'],
        default: 'à faire'
    },
    priorite: { 
        type: String, 
        enum: ['basse', 'moyenne', 'haute'],
        default: 'moyenne'
    },
    categorie: { 
        type: String, 
        required: true
    },
    sousTaches: [sousTacheSchema],
    commentaires: [commentaireSchema],
    dateModification: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Middleware pour mettre à jour la date de modification
taskSchema.pre('save', function(next) {
    this.dateModification = new Date();
    next();
});

// Index pour améliorer les performances des requêtes
taskSchema.index({ statut: 1 });
taskSchema.index({ priorite: 1 });
taskSchema.index({ categorie: 1 });
taskSchema.index({ echeance: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; 