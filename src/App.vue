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
  <div class="min-h-screen bg-[#F5F5F5]">

    <!-- Header -->
    <header class="bg-[#FF6900] px-4 py-10 text-center">
      <h1 class="text-3xl font-bold text-white mb-2">JET Restaurant Finder</h1>
      <p class="text-white text-sm mb-6 opacity-90">Enter a UK postcode to find restaurants near you</p>
      <!-- Listen for the 'search' event emitted by SearchBar -->
      <SearchBar @search="handleSearch" />
    </header>

    <!-- Content area -->
    <main class="max-w-6xl mx-auto px-4 py-8">

      <!-- Loading state -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 10"
          :key="n"
          class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 h-44 animate-pulse"
        >
          <div class="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
          <div class="flex gap-2 mb-3">
            <div class="h-6 bg-gray-200 rounded-full w-16"></div>
            <div class="h-6 bg-gray-200 rounded-full w-16"></div>
          </div>
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      <!-- Error state — shows API or network error messages -->
      <p v-else-if="errorMessage" class="text-center text-red-500 mt-8">{{ errorMessage }}</p>

      <!-- Results — only shown when not loading and no error -->
      <RestaurantList v-else :restaurants="restaurants" />

    </main>
  </div>
</template>
