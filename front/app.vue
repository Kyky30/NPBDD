<template>
  <div class="app">
    <header class="app-header">
      <h1>Gestionnaire de Tâches</h1>
      <button @click="showTaskForm = true" class="btn-add">
        + Nouvelle tâche
      </button>
    </header>

    <main class="app-main">
      <TaskList 
        ref="taskList"
        :tasks="tasks"
        @edit="editTask"
        @delete="deleteTask"
      />

      <div v-if="showTaskForm" class="modal">
        <div class="modal-content">
          <TaskForm 
            :task="selectedTask"
            :is-editing="!!selectedTask"
            @submit="handleTaskSubmit"
            @cancel="closeTaskForm"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'

const API_BASE_URL = 'http://localhost:3001/api'

const tasks = ref([])
const showTaskForm = ref(false)
const selectedTask = ref(null)
const taskList = ref(null)

const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    tasks.value = data
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error)
  }
}

const handleTaskSubmit = async (taskData) => {
  try {
    const url = selectedTask.value 
      ? `${API_BASE_URL}/tasks/${selectedTask.value._id}`
      : `${API_BASE_URL}/tasks`
    
    const method = selectedTask.value ? 'PUT' : 'POST'
    
    console.log(`${method} ${url}`, taskData)
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`)
    }

    await fetchTasks()
    closeTaskForm()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la tâche:', error)
  }
}

const editTask = (task) => {
  selectedTask.value = { ...task }
  showTaskForm.value = true
}

const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    await fetchTasks()
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error)
  }
}

const closeTaskForm = () => {
  showTaskForm.value = false
  selectedTask.value = null
}

onMounted(fetchTasks)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #212529;
  background: #f8f9fa;
}

.app {
  min-height: 100vh;
}

.app-header {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
  color: #495057;
}

.btn-add {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-add:hover {
  opacity: 0.9;
}

.app-main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
