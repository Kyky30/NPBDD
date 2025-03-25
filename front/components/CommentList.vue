<template>
  <div class="comments">
    <h4>Commentaires</h4>
    
    <div class="comment-list">
      <div v-for="(comment, index) in comments" :key="index" class="comment-item">
        <div class="comment-content">
          <textarea 
            v-model="comment.texte" 
            placeholder="Votre commentaire..."
            class="comment-textarea"
          ></textarea>
          <div class="comment-meta">
            <input 
              type="text" 
              v-model="comment.auteur" 
              placeholder="Auteur"
              class="comment-author"
            >
            <input 
              type="datetime-local" 
              v-model="comment.date" 
              class="comment-date"
            >
          </div>
        </div>
        <button @click="removeComment(index)" class="delete-btn">×</button>
      </div>
    </div>

    <button @click="addComment" class="add-btn">
      + Ajouter un commentaire
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

const comments = ref([...props.modelValue])

watch(() => props.modelValue, (newValue) => {
  comments.value = [...newValue]
}, { deep: true })

watch(comments, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

const addComment = () => {
  comments.value.push({
    texte: '',
    auteur: '',
    date: new Date().toISOString().slice(0, 16)
  })
}

const removeComment = (index) => {
  comments.value.splice(index, 1)
}
</script>

<style scoped>
.comments {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

h4 {
  margin: 0 0 10px 0;
  color: #495057;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment-item {
  display: flex;
  gap: 10px;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.comment-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comment-textarea {
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  resize: vertical;
}

.comment-meta {
  display: flex;
  gap: 10px;
}

.comment-author {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.comment-date {
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