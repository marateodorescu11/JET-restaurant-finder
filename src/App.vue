<script setup lang="ts">
import { ref } from 'vue'
import type { Restaurant } from './types/restaurant'
import SearchBar from './components/SearchBar.vue'
import RestaurantList from './components/RestaurantList.vue'

// Shared state managed by App.vue and passed down to child components
const restaurants = ref<Restaurant[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <h1 class="text-2xl font-bold text-center py-8">JET Restaurant Finder</h1>
    <SearchBar />
    <RestaurantList :restaurants="restaurants" />
  </div>
</template>
