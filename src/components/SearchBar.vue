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
  <div class="flex flex-col items-center gap-2">
    <form @submit.prevent="handleSubmit" class="flex w-full max-w-2xl">
      <!-- Reset error on every keystroke so it doesn't linger after the user corrects the postcode -->
      <input
        v-model="postcode"
        type="text"
        placeholder="e.g. EC4M 7RF"
        @input="errorMessage = ''"
        class="flex-1 px-6 py-3 rounded-l-full bg-white text-[#1A1A18] placeholder-gray-400 outline-none text-sm"
      />
      <button
        type="submit"
        class="px-7 py-3 rounded-r-full bg-white text-[#FF6900] font-semibold text-sm hover:bg-orange-50 transition-colors"
      >
        Search
      </button>
    </form>

    <!-- Only rendered when there is a validation error -->
    <p v-if="errorMessage" class="text-red-200 text-xs mt-1">{{ errorMessage }}</p>
  </div>
</template>
