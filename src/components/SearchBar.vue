<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  search: [postcode: string]
}>()

const postcode = ref('')

function handleSubmit() {
  emit('search', postcode.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="postcode"
      type="text"
      placeholder="Enter a UK postcode"
    />
    <button type="submit">Search</button>
  </form>
</template>
