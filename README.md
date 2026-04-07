# JET Restaurant Finder

A web application built for the Just Eat Takeaway.com Early Careers Software Engineering Program coding assignment. It lets you enter a UK postcode and displays the first 10 restaurants returned by the Just Eat API, showing each restaurant's name, cuisines, rating, and address.

## Tech Stack

- **Vue 3** with the Composition API
- **TypeScript** — strict mode, no `any` types
- **Tailwind CSS** for styling
- **Vite** as the build tool
- **Vitest** + **@vue/test-utils** for unit testing

## Project Structure

```
src/
  components/
    SearchBar.vue       # Postcode input with client-side validation
    RestaurantCard.vue  # Displays a single restaurant's data
    RestaurantList.vue  # Renders the grid of cards or an empty state
  services/
    restaurantService.ts  # All API logic lives here
  types/
    restaurant.ts       # TypeScript interfaces for the API response
  App.vue               # Root component — wires everything together
  main.ts
tests/
  unit/
    restaurantService.spec.ts
    RestaurantCard.spec.ts
```

## Getting Started

**Prerequisites:** Node.js 18+

**Clone and navigate into the project:**
```bash
cd JET-restaurant-finder
```

**Install dependencies:**
```bash
npm install
```

**Run the development server:**
```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

**Run the tests:**
```bash
npm run test
```

**Build for production:**
```bash
npm run build
```

The output will be in the `dist/` folder.

---

## Assumptions

**Postcode format in the URL**
The assignment's example URL uses `EC4M7RF` with no space. I assumed the API expects the postcode without spaces, so I strip all whitespace from the input before building the request URL (e.g. `EC4M 7RF` → `EC4M7RF`).

**Which rating field to display**
The API returns three rating-related fields: `starRating`, `userRating`, and `count`. I used `starRating` as it is always a number and represents the restaurant's overall score. `userRating` is frequently `null` in the live API response, so I decided not to use it to avoid displaying incomplete data.

**Order of results**
The assignment says to show "the first 10 restaurants returned". I interpreted this as the first 10 in the order the API returns them, with no additional sorting applied on my end. The API likely orders results by relevance or proximity.

---

## Things That Were Not Clear

**Which rating field to use**
The brief says to display "rating as a number" but the API response contains 2 rating fields. I went with `starRating` because `userRating` is null most of the time in the live API, and also because I thought starRating is the most important indicator.

**Whether to validate the postcode client-side**
The assignment does not mention input validation. I added UK postcode format validation before making the API call because it prevents unnecessary requests and gives the user clearer, faster feedback. If the format is wrong, there's no point hitting the network.

---

## Edge Cases Handled

- Invalid postcode format — inline error shown, no API call made
- Extra whitespace in the postcode — stripped before building the URL
- Network failure — caught and shown as a user-friendly error message
- Non-2xx HTTP response — caught, with the status code included in the message
- Malformed API response (missing `restaurants` array)
- `starRating` missing or `null` — displays `N/A`
- Empty cuisines array — displays `Not available`
- Missing address fields — filtered out so no empty commas appear in the address string
- Valid postcode but no restaurants returned — dedicated empty state message shown
- Loading state — 10 placeholder cards shown while the request is in flight

---

## Improvements I Would Make

- **Filtering and sorting** — let the user filter by cuisine type or sort by rating or name
- **Accessibility** — run a Lighthouse accessibility audit directly in Chrome DevTools and address any flagged issues (such as ARIA labels on interactive elements, colour contrast ratios)
- **Map view** — the API response includes coordinates (`location.coordinates`), which could be used to show restaurants on a map
- **Recent searches** — persist the last few postcodes in `localStorage` so the user can quickly re-run them
- **Pagination or "load more"** — if the brief allowed showing more than 10 results
