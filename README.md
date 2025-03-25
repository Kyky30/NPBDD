# Gestionnaire de Tâches - Nouveaux paradigmes de base de données

## Description
Application web de gestion de tâches développée avec MongoDB, Node.js et Vue.js. Cette application permet la gestion complète de tâches avec sous-tâches, commentaires, filtrage et tri avancé.

## Fonctionnalités

### Gestion des Tâches
- ✅ Création de tâches avec titre, description, statut, priorité, catégorie et date d'échéance
- ✅ Modification et suppression des tâches
- ✅ Gestion des sous-tâches
- ✅ Système de commentaires

### Filtrage et Tri
- ✅ Filtrage par statut (à faire, en cours, terminée, annulée)
- ✅ Filtrage par priorité (basse, moyenne, haute)
- ✅ Filtrage par catégorie
- ✅ Filtrage par date (avant/après)
- ✅ Recherche textuelle
- ✅ Tri par date d'échéance, priorité, ou date de création

## Architecture Technique

### Backend (Node.js + Express)
- MongoDB pour le stockage des données
- API REST complète
- Modèle de données optimisé
- Gestion des erreurs et validation

### Frontend (Vue.js)
- Interface responsive
- Composants réutilisables
- Gestion d'état réactive
- Validation des formulaires

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- pnpm ou npm

### Installation des gestionnaires de paquets
Si vous n'avez pas pnpm, vous pouvez l'installer globalement avec npm :
```bash
npm install -g pnpm
```
Ou utiliser directement npm pour la suite.

### Backend
Avec pnpm :
```bash
cd back
pnpm install
pnpm dev
```
Avec npm :
```bash
cd back
npm install
npm run dev
```

### Frontend
Avec pnpm :
```bash
cd front
pnpm install
pnpm dev
```
Avec npm :
```bash
cd front
npm install
npm run dev
```

## Structure de l'API

### Tâches
- `GET /api/tasks` : Liste des tâches avec filtres
- `POST /api/tasks` : Création d'une tâche
- `PUT /api/tasks/:id` : Modification d'une tâche
- `DELETE /api/tasks/:id` : Suppression d'une tâche

### Modèle de données
```javascript
Task {
  titre: String,
  description: String,
  statut: String,
  priorite: String,
  categorie: String,
  echeance: Date,
  sousTaches: [{
    titre: String,
    statut: String,
    echeance: Date
  }],
  commentaires: [{
    texte: String,
    auteur: String,
    date: Date
  }],
  dateCreation: Date,
  dateModification: Date
}
```

## Utilisation

### Filtrage
- Utilisez les sélecteurs de statut et priorité
- Entrez une catégorie dans le champ de recherche
- Utilisez les champs de date pour filtrer par période

### Tri
- Sélectionnez le critère de tri (date d'échéance, priorité, date de création)
- Choisissez l'ordre (croissant/décroissant)

### Gestion des tâches
1. Création : Cliquez sur "Nouvelle tâche"
2. Modification : Cliquez sur l'icône de modification d'une tâche
3. Suppression : Cliquez sur l'icône de suppression
4. Sous-tâches : Ajoutez-les dans le formulaire de tâche
5. Commentaires : Ajoutez-les dans la section commentaires

## Sécurité
- Validation des données côté serveur
- Protection contre les injections NoSQL
- Gestion sécurisée des dates

## Performance
- Indexation MongoDB optimisée
- Chargement différé des données
- Mise en cache côté client

## Auteur
Kylian VINEL - A1

## Licence
MIT