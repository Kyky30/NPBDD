<template>
  <div class="task-list">
    <div class="filters-panel">
      <h3>Filtres et tri</h3>
      
      <div class="filters-container">
        <!-- Filtres de base -->
        <div class="filters-section">
          <h4>Filtres principaux</h4>
          <div class="filter-row">
            <select v-model="filters.statut" class="filter-select">
              <option value="">Tous les statuts</option>
              <option value="à faire">À faire</option>
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
              <option value="annulée">Annulée</option>
            </select>

            <select v-model="filters.priorite" class="filter-select">
              <option value="">Toutes les priorités</option>
              <option value="basse">Basse</option>
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
            </select>
          </div>
        </div>

        <!-- Filtres de date -->
        <div class="filters-section">
          <h4>Période</h4>
          <div class="filter-row">
            <div class="date-filter">
              <label>Du</label>
              <input 
                type="date" 
                v-model="filters.dateApres" 
                class="filter-date"
              >
            </div>
            <div class="date-filter">
              <label>Au</label>
              <input 
                type="date" 
                v-model="filters.dateAvant" 
                class="filter-date"
              >
            </div>
          </div>
        </div>

        <!-- Options de tri -->
        <div class="filters-section">
          <h4>Tri</h4>
          <div class="filter-row">
            <select v-model="sortBy" class="filter-select">
              <option value="echeance">Date d'échéance</option>
              <option value="priorite">Priorité</option>
              <option value="dateCreation">Date de création</option>
            </select>

            <select v-model="sortOrder" class="filter-select">
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Recherche -->
      <div class="search-section">
        <input 
          type="text" 
          v-model="filters.recherche" 
          placeholder="Rechercher une tâche..."
          class="search-input"
        >
        <input 
          type="text" 
          v-model="filters.categorie" 
          placeholder="Filtrer par catégorie"
          class="category-input"
        >
      </div>
    </div>

    <div class="tasks-grid">
      <div v-for="task in sortedTasks" :key="task._id" class="task-card">
        <div class="task-header">
          <h3>{{ task.titre }}</h3>
          <div class="task-actions">
            <button @click="editTask(task)" class="btn-edit">✎</button>
            <button @click="deleteTask(task._id)" class="btn-delete">×</button>
          </div>
        </div>

        <p class="task-description">{{ task.description }}</p>

        <div class="task-meta">
          <span :class="['task-status', task.statut]">{{ task.statut }}</span>
          <span :class="['task-priority', task.priorite]">{{ task.priorite }}</span>
          <span class="task-category">{{ task.categorie }}</span>
          <span class="task-due">Échéance: {{ formatDate(task.echeance) }}</span>
        </div>

        <div v-if="task.sousTaches && task.sousTaches.length > 0" class="subtasks">
          <h4>Sous-tâches</h4>
          <ul>
            <li v-for="(subtask, index) in task.sousTaches" :key="index">
              {{ subtask.titre }} - {{ subtask.statut }}
              <span v-if="subtask.echeance">({{ formatDate(subtask.echeance) }})</span>
            </li>
          </ul>
        </div>

        <div v-if="task.commentaires && task.commentaires.length > 0" class="comments">
          <h4>Commentaires</h4>
          <ul>
            <li v-for="(comment, index) in task.commentaires" :key="index">
              <div class="comment-header">
                <strong>{{ comment.auteur }}</strong>
                <span>{{ formatDate(comment.date) }}</span>
              </div>
              <p>{{ comment.texte }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['edit', 'delete'])

const filters = ref({
  statut: '',
  priorite: '',
  categorie: '',
  dateAvant: '',
  dateApres: '',
  recherche: ''
})

const sortBy = ref('echeance')
const sortOrder = ref('asc')

const filteredTasks = computed(() => {
  return props.tasks.filter(task => {
    const matchStatut = !filters.value.statut || task.statut === filters.value.statut
    const matchPriorite = !filters.value.priorite || task.priorite === filters.value.priorite
    const matchCategorie = !filters.value.categorie || 
      task.categorie.toLowerCase().includes(filters.value.categorie.toLowerCase())
    const matchDateAvant = !filters.value.dateAvant || new Date(task.echeance) <= new Date(filters.value.dateAvant)
    const matchDateApres = !filters.value.dateApres || new Date(task.echeance) >= new Date(filters.value.dateApres)
    const matchRecherche = !filters.value.recherche || 
      task.titre.toLowerCase().includes(filters.value.recherche.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.value.recherche.toLowerCase())

    return matchStatut && matchPriorite && matchCategorie && 
           matchDateAvant && matchDateApres && matchRecherche
  })
})

const sortedTasks = computed(() => {
  return [...filteredTasks.value].sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const editTask = (task) => {
  emit('edit', task)
}

const deleteTask = (taskId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    emit('delete', taskId)
  }
}

defineExpose({
  filters,
  sortBy,
  sortOrder
})
</script>

<style scoped>
.task-list {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.filters-panel {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filters-panel h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.filters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.filters-section {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.filters-section h4 {
  margin: 0 0 12px 0;
  color: #495057;
  font-size: 1rem;
}

.filter-row {
  display: flex;
  gap: 10px;
}

.filter-select,
.filter-date {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #495057;
  background: white;
}

.date-filter {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-filter label {
  font-size: 0.85rem;
  color: #6c757d;
}

.search-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 15px;
  padding-top: 15px;
  border-top: 1px solid #dee2e6;
}

.search-input,
.category-input {
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
}

.search-input::placeholder,
.category-input::placeholder {
  color: #adb5bd;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.task-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-header h3 {
  margin: 0;
  color: #495057;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  padding: 4px 8px;
}

.btn-edit {
  color: #007bff;
}

.btn-delete {
  color: #dc3545;
}

.task-description {
  color: #6c757d;
  margin-bottom: 15px;
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.task-status,
.task-priority,
.task-category,
.task-due {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.task-status {
  background: #e9ecef;
  color: #495057;
}

.task-status.à faire { background: #fff3cd; color: #856404; }
.task-status.en cours { background: #cce5ff; color: #004085; }
.task-status.terminée { background: #d4edda; color: #155724; }
.task-status.annulée { background: #f8d7da; color: #721c24; }

.task-priority {
  background: #e9ecef;
  color: #495057;
}

.task-priority.basse { background: #d4edda; color: #155724; }
.task-priority.moyenne { background: #fff3cd; color: #856404; }
.task-priority.haute { background: #f8d7da; color: #721c24; }

.task-category {
  background: #e9ecef;
  color: #495057;
}

.task-due {
  background: #e9ecef;
  color: #495057;
}

.subtasks,
.comments {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #dee2e6;
}

.subtasks h4,
.comments h4 {
  margin: 0 0 10px 0;
  color: #495057;
}

.subtasks ul,
.comments ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subtasks li {
  padding: 4px 0;
  color: #6c757d;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 0.9em;
}

.comment-header strong {
  color: #495057;
}

.comment-header span {
  color: #6c757d;
}

.comments p {
  margin: 0;
  color: #6c757d;
}

/* Responsive design */
@media (max-width: 768px) {
  .filters-container {
    grid-template-columns: 1fr;
  }

  .search-section {
    grid-template-columns: 1fr;
  }

  .filter-row {
    flex-direction: column;
  }
}
</style> 