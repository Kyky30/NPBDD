<template>
  <div class="subtasks">
    <h4>Sous-tâches</h4>
    
    <div class="subtask-list">
      <div v-for="(subtask, index) in subtasks" :key="index" class="subtask-item">
        <div class="subtask-content">
          <input 
            type="text" 
            v-model="subtask.titre" 
            placeholder="Titre de la sous-tâche"
            class="subtask-input"
          >
          <select v-model="subtask.statut" class="subtask-select">
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
            <option value="annulée">Annulée</option>
          </select>
          <input 
            type="date" 
            v-model="subtask.echeance" 
            class="subtask-date"
          >
        </div>
        <button @click="removeSubtask(index)" class="delete-btn">×</button>
      </div>
    </div>

    <button @click="addSubtask" class="add-btn">
      + Ajouter une sous-tâche
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const subtasks = ref([...props.modelValue])

watch(() => props.modelValue, (newValue) => {
  subtasks.value = [...newValue]
}, { deep: true })

watch(subtasks, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

const addSubtask = () => {
  subtasks.value.push({
    titre: '',
    statut: 'à faire',
    echeance: ''
  })
}

const removeSubtask = (index) => {
  subtasks.value.splice(index, 1)
}
</script>

<style scoped>
.subtasks {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

h4 {
  margin: 0 0 10px 0;
  color: #495057;
}

.subtask-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.subtask-item {
  display: flex;
  gap: 10px;
  align-items: center;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.subtask-content {
  flex: 1;
  display: flex;
  gap: 10px;
  align-items: center;
}

.subtask-input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.subtask-select {
  padding: 4px 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.subtask-date {
  padding: 4px 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0 8px;
}

.add-btn {
  margin-top: 10px;
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.add-btn:hover {
  opacity: 0.9;
}
</style> 