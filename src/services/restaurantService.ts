import type { ApiResponse, Restaurant } from '../types/restaurant'

// In development, requests go through the Vite proxy (/api) to avoid CORS.
// The proxy forwards /api/* to https://uk.api.just-eat.io/*
const BASE_URL = '/api/discovery/uk/restaurants/enriched/bypostcode'

export async function getRestaurantsByPostcode(postcode: string): Promise<Restaurant[]> {
  // Assumption 1: the API accepts postcodes without spaces 
  const sanitised = postcode.trim().replace(/\s+/g, '')

  let response: Response
  try {
    response = await fetch(`${BASE_URL}/${sanitised}`)
  } catch {
    throw new Error('Network error: unable to reach the Just Eat API.')
  }

  if (!response.ok) {
    throw new Error(
      `API error: ${response.status} ${response.statusText}. Check the postcode and try again.`,
    )
  }

  const data = (await response.json()) as ApiResponse

  if (!Array.isArray(data.restaurants)) {
    throw new Error('Unexpected API response: missing restaurants data.')
  }

  return data.restaurants.slice(0, 10)
}
