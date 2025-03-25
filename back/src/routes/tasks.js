const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks - Récupérer toutes les tâches avec filtres et tri
router.get('/', async (req, res) => {
    try {
        const {
            statut,
            priorite,
            categorie,
            etiquette,
            avant,
            apres,
            q,
            tri,
            ordre
        } = req.query;

        let query = {};

        // Filtres
        if (statut) query.statut = statut;
        if (priorite) query.priorite = priorite;
        if (categorie) query.categorie = categorie;
        if (etiquette) query.etiquettes = etiquette;
        if (avant) query.echeance = { ...query.echeance, $lte: new Date(avant) };
        if (apres) query.echeance = { ...query.echeance, $gte: new Date(apres) };
        if (q) {
            query.$or = [
                { titre: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ];
        }

        // Tri
        let sort = {};
        if (tri) {
            sort[tri] = ordre === 'desc' ? -1 : 1;
        }

        const tasks = await Task.find(query).sort(sort);
        res.json(tasks);
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET /tasks/:id - Récupérer une tâche par son ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /tasks - Créer une nouvelle tâche
router.post('/', async (req, res) => {
    try {
        console.log('Données reçues:', req.body);
        const task = new Task(req.body);
        const newTask = await task.save();
        console.log('Tâche créée:', newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Erreur lors de la création:', error);
        res.status(400).json({ message: error.message });
    }
});

// PUT /tasks/:id - Modifier une tâche
router.put('/:id', async (req, res) => {
    try {
        console.log('Mise à jour de la tâche:', req.params.id)
        console.log('Données reçues:', req.body)

        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' })
        }

        // S'assurer que sousTaches et commentaires sont des tableaux
        if (!Array.isArray(req.body.sousTaches)) {
            req.body.sousTaches = []
        }
        if (!Array.isArray(req.body.commentaires)) {
            req.body.commentaires = []
        }

        // Mettre à jour la tâche avec les nouvelles données
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { 
                $set: {
                    ...req.body,
                    dateModification: new Date()
                }
            },
            { new: true, runValidators: true }
        )

        console.log('Tâche mise à jour:', updatedTask)
        res.json(updatedTask)
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error)
        res.status(400).json({ message: error.message })
    }
})

// DELETE /tasks/:id - Supprimer une tâche
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        await Task.deleteOne({ _id: req.params.id });
        console.log('Tâche supprimée:', req.params.id);
        res.json({ message: 'Tâche supprimée' });
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 