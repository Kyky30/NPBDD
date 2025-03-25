<template>
  <div class="task-form">
    <h2>{{ isEditing ? 'Modifier la tâche' : 'Nouvelle tâche' }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="titre">Titre</label>
        <input 
          type="text" 
          id="titre" 
          v-model="formData.titre" 
          required
          class="form-control"
        >
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          v-model="formData.description" 
          required
          class="form-control"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="statut">Statut</label>
          <select id="statut" v-model="formData.statut" required class="form-control">
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
            <option value="annulée">Annulée</option>
          </select>
        </div>

        <div class="form-group">
          <label for="priorite">Priorité</label>
          <select id="priorite" v-model="formData.priorite" required class="form-control">
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="categorie">Catégorie</label>
          <input 
            type="text" 
            id="categorie" 
            v-model="formData.categorie" 
            required
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label for="echeance">Échéance</label>
          <input 
            type="date" 
            id="echeance" 
            v-model="formData.echeance" 
            required
            class="form-control"
          >
        </div>
      </div>

      <SubTaskList v-model="formData.sousTaches" />
      <CommentList v-model="formData.commentaires" />

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Mettre à jour' : 'Créer' }}
        </button>
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="btn btn-secondary"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SubTaskList from './SubTaskList.vue'
import CommentList from './CommentList.vue'

const props = defineProps({
  task: {
    type: Object,
    default: () => ({
      titre: '',
      description: '',
      statut: 'à faire',
      priorite: 'moyenne',
      categorie: '',
      echeance: '',
      sousTaches: [],
      commentaires: []
    })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({
  titre: '',
  description: '',
  statut: 'à faire',
  priorite: 'moyenne',
  categorie: '',
  echeance: '',
  sousTaches: [],
  commentaires: []
})

// Fonction pour formater la date au format YYYY-MM-DD
const formatDateForInput = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

// Mettre à jour formData quand props.task change
watch(() => props.task, (newTask) => {
  formData.value = {
    ...newTask,
    echeance: formatDateForInput(newTask.echeance)
  }
}, { immediate: true })

// Avant de soumettre, convertir la date au format ISO
const handleSubmit = () => {
  const taskData = {
    ...formData.value,
    echeance: new Date(formData.value.echeance).toISOString()
  }
  emit('submit', taskData)
}
</script>

<style scoped>
.task-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #495057;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #495057;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

textarea.form-control {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style> 