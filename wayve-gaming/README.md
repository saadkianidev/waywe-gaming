# Wayve Gaming Website

Wayve Gaming is a React + Vite single page website for a game studio. It includes public marketing pages, a game catalog, game detail pages, contact and career forms, privacy content, and lightweight admin-style pages for viewing submitted data and editing the game catalog.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 3
- Font Awesome icon classes
- Local JSON data files for games, contacts, and career applications
- Custom Vite development middleware for local JSON API routes
- Browser localStorage fallbacks for static production builds

## Quick Start

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Available Routes

| Route | Page | Description |
| --- | --- | --- |
| `/` | Home | Main landing page with hero, videos, stats, featured games, mission, team, careers, and contact form. |
| `/about` | About | Studio overview, mission, differentiators, client retention section, CTA, and FAQ. |
| `/games` | Games | Full game catalog with cards, tags, store links, and detail links. |
| `/games/:slug` | Game Detail | Detail page for an individual game from `src/data/games.json`. |
| `/contact` | Contact | Contact hero, contact form, studio contact details, and CTA. |
| `/careers` | Careers | Multi-step career application form. |
| `/privacy` | Legal | Privacy policy page. |
| `/legal` | Legal | Same legal/privacy page. |
| `/career-data` | Career Data | Admin-style table for submitted career applications. |
| `/contact-data` | Contact Data | Admin-style table for submitted contact messages. |
| `/game-crud` | Game Editor | Admin-style game catalog editor for add, edit, and delete operations. |

Routing is handled manually in `src/App.jsx` using `window.history.pushState`, `popstate`, and path matching. There is no external routing library.

## Public Features

### Home Page

- Full-screen stacked hero experience with scroll-driven panels.
- Video background panels with autoplay/pause behavior based on viewport visibility.
- Smooth scroll button for moving through hero panels.
- Animated reveal steps in the hero.
- Feature sidebar for game solutions, AI/game development, multiplayer gaming, and live game operations.
- Stats section with product, player, market, and support metrics.
- Featured games section using the first four games from `src/data/games.json`.
- Mission/story section.
- Team grid with hover overlays and social icon placeholders.
- Careers preview with open roles and email subscription UI.
- Embedded contact form.

### About Page

- Image hero section.
- Studio identity and mission content.
- Metrics cards.
- Differentiator cards.
- Client retention/value section.
- CTA block.
- FAQ accordion/list powered by `FaqList`.

### Games Catalog

- Responsive catalog grid.
- Game cards generated from `src/data/games.json`.
- Game image, title, tags, and hover effects.
- Links to individual game detail pages.
- Android and iOS external store/search links.
- CTA section at the bottom.

### Game Detail Pages

Each `/games/:slug` page is generated from one game object in `src/data/games.json`.

Features include:

- Not-found state for unknown slugs.
- Store buttons for Google Play and App Store links.
- Main game image.
- Developer, publisher, release date, and platform icon sections.
- About-this-game content.
- Gameplay mode badges.
- Screenshot gallery using up to five screenshots.
- Feature cards from each game's `features` array.
- Minimum and recommended device requirements.
- Game-specific CTA.
- Related/other games section.

### Contact Page and Contact Form

- Contact page hero.
- Reusable `ContactSection` component.
- Contact details for email, phone, and office addresses.
- Contact form fields:
  - Full name
  - Email address
  - Country
  - Phone number
  - Message
- Success message after submission.
- Error handling for failed API responses.
- Production fallback saves contact messages to browser localStorage.

### Careers Page and Application Form

- Multi-step application flow:
  1. Role selection
  2. Applicant details
  3. Experience and message
  4. Review and submit
- Roles include Game Developer, Game Designer, 3D Artist, and Project Manager.
- Required field checks before moving to the next step.
- Review screen before final submission.
- Success confirmation after submission.
- Production fallback saves applications to browser localStorage.

### Theme Support

- Dark/light theme support through `src/hooks/useTheme.jsx`.
- Navbar receives a theme toggle handler.
- Tailwind dark-mode classes are used throughout the UI.

### Loading Screen

- Initial loading overlay from `LoadingScreen`.
- App content renders behind the loading state after completion.

### Navigation and Layout

- Reusable navbar and footer.
- Smooth scrolling for hash links.
- Internal link interception for SPA-style navigation.
- Responsive layouts using Tailwind breakpoints.
- Reusable hero, CTA, reveal animation, logo, FAQ, and contact components.

## Admin and Data Features

### Career Data Page

Route: `/career-data`

- Loads career applications from `/api/applications` in development.
- Falls back to `src/data/careerApplications.json` plus localStorage data in production.
- Displays submissions in a responsive table.
- Includes submitted date, role, name, email, location, experience, portfolio, and message.

### Contact Data Page

Route: `/contact-data`

- Loads contact messages from `/api/contacts` in development.
- Falls back to `src/data/contactMessages.json` plus localStorage data in production.
- Displays submissions in a responsive table.
- Includes submitted date, name, email, country, phone, and message.

### Game Editor

Route: `/game-crud`

- Loads games from `/api/games` in development.
- Falls back to `src/data/games.json` plus localStorage data in production.
- Supports adding new games.
- Supports editing existing games.
- Supports deleting games.
- Validates slug format.
- Checks for duplicate slugs.
- Accepts comma-separated tags.
- Accepts one screenshot URL per line.
- Accepts feature data as JSON.
- Accepts requirements data as JSON.
- Saves production fallback edits to localStorage under `wayve:games`.

## Data Files

### `src/data/games.json`

Primary game catalog data. Each game contains:

- `slug`
- `title`
- `genre`
- `tags`
- `image`
- `androidUrl`
- `iosUrl`
- `description`
- `screenshots`
- `features`
- `requirements`

The `requirements` object includes:

- `platform`
- `players`
- `release`
- `minimum`
- `recommended`

Minimum and recommended requirements include:

- `os`
- `processor`
- `memory`
- `graphics`
- `storage`

### `src/data/contactMessages.json`

Stores contact submissions for development API reads/writes.

### `src/data/careerApplications.json`

Stores career application submissions for development API reads/writes.

## Development API

The project defines a custom Vite plugin in `vite.config.js` named `json-data-api`. This plugin creates development-only API routes:

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/applications` | Read career applications. |
| `POST` | `/api/applications` | Save a career application to `src/data/careerApplications.json`. |
| `GET` | `/api/contacts` | Read contact messages. |
| `POST` | `/api/contacts` | Save a contact message to `src/data/contactMessages.json`. |
| `GET` | `/api/games` | Read the game catalog. |
| `POST` | `/api/games` | Add a game to `src/data/games.json`. |
| `PUT` | `/api/games/:slug` | Update an existing game. |
| `DELETE` | `/api/games/:slug` | Delete a game. |

Important: these API routes only exist while running `npm run dev`. They are not included in the static production build.

## Production Fallback Behavior

Because Vite middleware does not exist after `npm run build`, the app includes browser localStorage fallbacks in `src/utils/api.js`.

Fallback storage keys:

| Key | Data |
| --- | --- |
| `wayve:applications` | Career applications submitted from the built/static site. |
| `wayve:contacts` | Contact messages submitted from the built/static site. |
| `wayve:games` | Game catalog edits made from the built/static site. |

This prevents production pages from crashing when `/api/...` returns the app HTML instead of JSON.

Limitations:

- localStorage data is browser-specific.
- Data does not sync across users or devices.
- Data can be cleared by the browser.
- For a real public website, replace the Vite-only API with a backend, serverless functions, CMS, database, or form service.

## API Helper Utilities

`src/utils/api.js` contains shared utilities:

- `readJsonResponse(response, fallbackMessage)` checks the response content type before parsing JSON.
- `productionApiMessage(action)` builds a clear message when a dev-only API is unavailable.
- `getStoredItems(key, fallbackItems)` reads localStorage safely.
- `setStoredItems(key, items)` writes a full list to localStorage.
- `addStoredItem(key, item, fallbackItems)` appends one item to localStorage.
- `createClientSubmission(prefix, form)` adds an ID and timestamp for client-side submissions.

## Project Structure

```text
src/
  App.jsx                     Manual route handling and app layout
  main.jsx                    React entry point
  index.css                   Tailwind and global styles
  App.css                     Additional app styles
  assets/                     Static image/SVG assets
  components/
    CallToAction.jsx          Reusable CTA section
    Contact.jsx               Contact component
    ContactSection.jsx        Contact form and contact details
    FaqList.jsx               FAQ rendering component
    Footer.jsx                Site footer
    LoadingScreen.jsx         Initial loading screen
    Logo.jsx                  Site logo component
    Navbar.jsx                Navigation and theme toggle
    PageHero.jsx              Reusable page hero
    Reveal.jsx                Reveal animation wrapper
  data/
    careerApplications.json   Career application data
    contactMessages.json      Contact message data
    games.json                Game catalog data
  hooks/
    useTheme.jsx              Theme state/toggle hook
  pages/
    About.jsx                 About page
    CareerData.jsx            Career application table
    CareersPage.jsx           Career application flow
    Contact.jsx               Contact page
    ContactData.jsx           Contact message table
    GameCrud.jsx              Game catalog editor
    GameDetail.jsx            Game detail page
    Games.jsx                 Game catalog page
    Home.jsx                  Landing page
    Legal.jsx                 Privacy/legal page
  utils/
    api.js                    JSON response and localStorage helpers
```

## Styling

- Tailwind CSS is configured in `tailwind.config.js`.
- Global styles are in `src/index.css`.
- Components use utility classes directly.
- Dark mode styles use Tailwind `dark:` variants.
- Button styles such as `btn-primary`, `btn-secondary`, and related classes are defined in global CSS.

## Content Management Notes

### Add or Edit Games Manually

Edit `src/data/games.json` and follow the existing object shape. Each game must have a unique `slug` because the slug powers `/games/:slug` routes.

### Add or Edit Games Through UI

Use `/game-crud`.

- In development, edits are written to `src/data/games.json` through the Vite API.
- In a production/static build, edits are stored in browser localStorage.

### View Form Submissions

Use:

- `/career-data` for career applications.
- `/contact-data` for contact messages.

Development submissions are written to JSON files. Production/static submissions are stored in localStorage.

## Build Notes

The Vite config uses:

```js
base: './'
```

This makes the production build more portable for relative asset paths, including deployments that are not hosted at the domain root.

## Known Considerations

- The app is an SPA with manual routing. Server deployments should fall back to `index.html` for unknown paths such as `/games/shadow-protocols`.
- The custom API is development-only. A real production backend is required for shared, durable submissions and game editing.
- Some content is placeholder/marketing copy and can be refined for final brand messaging.
- External images are loaded from remote URLs, so image availability depends on those providers.
- Font Awesome classes require the icon stylesheet to be available from the HTML setup.

## Recommended Production Upgrade

For a live public site, replace localStorage fallbacks with one of these:

- Serverless API routes with a database.
- A headless CMS for game catalog management.
- A form service for contacts and career applications.
- A small Node/Express backend that reuses the current JSON validation logic.

After adding a real backend, update the frontend API paths in the form and admin pages, then remove or keep localStorage as an offline fallback.