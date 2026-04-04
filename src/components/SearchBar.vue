<script setup lang="ts">
import { ref } from 'vue'

// Emits a 'search' event with the validated postcode string up to the parent
const emit = defineEmits<{
  search: [postcode: string]
}>()

const postcode = ref('')
const errorMessage = ref('')

// Covers all standard UK postcode formats e.g. EC4M 7RF, SW1A 1AA, M1 1AE
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i

function handleSubmit() {
  // Do not emit if the postcode format is invalid
  if (!UK_POSTCODE_REGEX.test(postcode.value.trim())) {
    errorMessage.value = 'Please enter a valid UK postcode (e.g. EC4M 7RF).'
    return
  }
  emit('search', postcode.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="postcode"
      type="text"
      placeholder="Enter a UK postcode"
      @input="errorMessage = ''"
    />
    <button type="submit">Search</button>
    <!-- Only rendered when there is a validation error -->
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>
