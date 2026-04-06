import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getRestaurantsByPostcode } from '../../src/services/restaurantService'
import type { Restaurant } from '../../src/types/restaurant'

// Helper to create a fake restaurant object for testing
function makeRestaurant(id: string): Restaurant {
  return {
    id,
    name: `Restaurant ${id}`,
    cuisines: [{ name: 'Italian', uniqueName: 'italian' }],
    rating: { count: 100, starRating: 4.5, userRating: null },
    address: { firstLine: '1 Test St', city: 'London', postalCode: 'EC4M 7RF' },
  }
}

// Build an array of n restaurants
function makeRestaurants(n: number): Restaurant[] {
  return Array.from({ length: n }, (_, i) => makeRestaurant(String(i + 1)))
}

describe('getRestaurantsByPostcode', () => {
   // Reset mocks between tests so they don't interfere with each other
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns the first 10 restaurants from the API response', async () => {
    // fetch to return 15 restaurants
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ restaurants: makeRestaurants(15) }),
    }))


    const result = await getRestaurantsByPostcode('EC4M7RF')

    // only 10 are returned
    expect(result).toHaveLength(10)
    expect(result[0].id).toBe('1')
    expect(result[9].id).toBe('10')
  })

  it('returns fewer than 10 if the API returns fewer', async () => {
    // only 3 restaurants in the response, all 3 should come back
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ restaurants: makeRestaurants(3) }),
    }))

    const result = await getRestaurantsByPostcode('EC4M7RF')

    expect(result).toHaveLength(3)
  })

  it('strips whitespace from the postcode before building the URL', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ restaurants: [] }),
    })
    vi.stubGlobal('fetch', mockFetch)

    await getRestaurantsByPostcode('EC4M 7RF')

    // The URL passed to fetch should not contain a space
    const calledUrl = mockFetch.mock.calls[0][0] as string
    expect(calledUrl).not.toContain(' ')
    expect(calledUrl).toContain('EC4M7RF')
  })

  it('throws a network error when fetch rejects', async () => {
    // Simulate no internet / DNS failure
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')))

    await expect(getRestaurantsByPostcode('EC4M7RF')).rejects.toThrow(
      'Network error: unable to reach the Just Eat API.',
    )
  })

  it('throws when the API returns a non-2xx response', async () => {
    // Simulate a 404 from the API
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    }))

    await expect(getRestaurantsByPostcode('EC4M7RF')).rejects.toThrow('API error: 404')
  })

  it('throws when the response is missing the restaurants array', async () => {
    // Simulate a malformed response body
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ metaData: {} }),
    }))

    await expect(getRestaurantsByPostcode('EC4M7RF')).rejects.toThrow(
      'Unexpected API response: missing restaurants data.',
    )
  })
})
