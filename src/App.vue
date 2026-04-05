<script setup lang="ts">
import { ref } from 'vue'
import type { Restaurant } from './types/restaurant'
import { getRestaurantsByPostcode } from './services/restaurantService'
import SearchBar from './components/SearchBar.vue'
import RestaurantList from './components/RestaurantList.vue'

// Shared state managed by App.vue and passed down to child components
const restaurants = ref<Restaurant[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

// Called when SearchBar emits a 'search' event with a validated postcode
async function handleSearch(postcode: string) {
  restaurants.value = []
  errorMessage.value = null
  isLoading.value = true

  try {
    restaurants.value = await getRestaurantsByPostcode(postcode)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Something went wrong.'
  } finally {
    // Always stop loading whether the request succeeded or failed
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <h1 class="text-2xl font-bold text-center py-8">JET Restaurant Finder</h1>
    <!-- Listen for the 'search' event emitted by SearchBar -->
    <SearchBar @search="handleSearch" />

    <!-- Loading state -->
    <p v-if="isLoading">Loading restaurants...</p>

    <!-- Error state — shows API or network error messages -->
    <p v-else-if="errorMessage">{{ errorMessage }}</p>

    <!-- Results — only shown when not loading and no error -->
    <RestaurantList v-else :restaurants="restaurants" />
  </div>
</template>
