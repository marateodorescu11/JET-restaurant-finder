export interface Cuisine {
  name: string
  uniqueName: string
}

export interface Address {
  city: string
  firstLine: string
  postalCode: string
}

export interface Rating {
  count: number
  starRating: number
  userRating: number | null
}

export interface Restaurant {
  id: string
  name: string
  cuisines: Cuisine[]
  rating: Rating
  address: Address
}

export interface ApiResponse {
  restaurants: Restaurant[]
}
