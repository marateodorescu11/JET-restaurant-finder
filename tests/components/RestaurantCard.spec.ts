import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RestaurantCard from '../../src/components/RestaurantCard.vue'
import type { Restaurant } from '../../src/types/restaurant'

// A base restaurant object I can reuse across tests
// I spread overrides on top so each test only changes what it cares about
function makeRestaurant(overrides: Partial<Restaurant> = {}): Restaurant {
  return {
    id: '1',
    name: 'Test Restaurant',
    cuisines: [{ name: 'Italian', uniqueName: 'italian' }],
    rating: { count: 100, starRating: 4.5, userRating: null },
    address: { firstLine: '1 Test St', city: 'London', postalCode: 'EC4M 7RF' },
    ...overrides,
  }
}

describe('RestaurantCard', () => {
  it('renders the restaurant name', () => {
    const wrapper = mount(RestaurantCard, {
      props: { restaurant: makeRestaurant() },
    })

    expect(wrapper.find('h2').text()).toBe('Test Restaurant')
  })

  it('renders each cuisine as a tag', () => {
    const restaurant = makeRestaurant({
      cuisines: [
        { name: 'Italian', uniqueName: 'italian' },
        { name: 'Pizza', uniqueName: 'pizza' },
      ],
    })
    const wrapper = mount(RestaurantCard, { props: { restaurant } })

    // Each cuisine is rendered as a span with class rounded-full
    const tags = wrapper.findAll('span.rounded-full')
    expect(tags).toHaveLength(2)
    expect(tags[0].text()).toBe('Italian')
    expect(tags[1].text()).toBe('Pizza')
  })

  it('shows "Not available" when there are no cuisines', () => {
    const wrapper = mount(RestaurantCard, {
      props: { restaurant: makeRestaurant({ cuisines: [] }) },
    })

    expect(wrapper.text()).toContain('Not available')
  })

  it('renders the star rating', () => {
    const wrapper = mount(RestaurantCard, {
      props: { restaurant: makeRestaurant() },
    })

    expect(wrapper.text()).toContain('4.5')
  })

  it('shows "N/A" when starRating is null', () => {
    const restaurant = makeRestaurant({
      rating: { count: 0, starRating: null, userRating: null },
    })
    const wrapper = mount(RestaurantCard, { props: { restaurant } })

    expect(wrapper.text()).toContain('N/A')
  })

  it('renders the full address', () => {
    const wrapper = mount(RestaurantCard, {
      props: { restaurant: makeRestaurant() },
    })

    expect(wrapper.find('p').text()).toBe('1 Test St, London, EC4M 7RF')
  })

  it('skips empty address parts so there are no stray commas', () => {
    const restaurant = makeRestaurant({
      address: { firstLine: '1 Test St', city: '', postalCode: 'EC4M 7RF' },
    })
    const wrapper = mount(RestaurantCard, { props: { restaurant } })

    expect(wrapper.find('p').text()).toBe('1 Test St, EC4M 7RF')
  })
})
