import { Buffer } from 'node:buffer';
import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDirectory = dirname(fileURLToPath(import.meta.url));
const applicationsFile = resolve(rootDirectory, 'src/data/careerApplications.json');
const contactsFile = resolve(rootDirectory, 'src/data/contactMessages.json');
const gamesFile = resolve(rootDirectory, 'src/data/games.json');

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
}

function jsonDataApi() {
  return {
    name: 'json-data-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url, 'http://localhost').pathname;
        const gameMatch = pathname.match(/^\/api\/games(?:\/([^/]+))?$/);
        const isApplicationsRoute = pathname === '/api/applications';
        const isContactsRoute = pathname === '/api/contacts';

        if (!isApplicationsRoute && !isContactsRoute && !gameMatch) {
          next();
          return;
        }

        try {
          if (isApplicationsRoute) {
            const current = JSON.parse(await readFile(applicationsFile, 'utf8'));
            if (request.method === 'GET') {
              sendJson(response, 200, { applications: current.applications ?? [] });
              return;
            }
            if (request.method !== 'POST') {
              sendJson(response, 405, { error: 'Method not allowed.' });
              return;
            }

            const form = await readRequestBody(request);
            const application = {
              ...form,
              id: randomUUID(),
              submittedAt: new Date().toISOString(),
            };
            const updated = {
              ...current,
              form: { ...current.form, ...form },
              applications: [...(current.applications ?? []), application],
            };
            await writeFile(applicationsFile, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
            sendJson(response, 201, { application });
            return;
          }

          if (isContactsRoute) {
            const current = JSON.parse(await readFile(contactsFile, 'utf8'));
            if (request.method === 'GET') {
              sendJson(response, 200, { contacts: current.contacts ?? [] });
              return;
            }
            if (request.method !== 'POST') {
              sendJson(response, 405, { error: 'Method not allowed.' });
              return;
            }

            const form = await readRequestBody(request);
            const contact = {
              ...form,
              id: randomUUID(),
              submittedAt: new Date().toISOString(),
            };
            const updated = { ...current, contacts: [...(current.contacts ?? []), contact] };
            await writeFile(contactsFile, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
            sendJson(response, 201, { contact });
            return;
          }

          const current = JSON.parse(await readFile(gamesFile, 'utf8'));
          const games = current.games ?? [];
          const gameSlug = gameMatch[1] ? decodeURIComponent(gameMatch[1]) : null;

          if (!gameSlug && request.method === 'GET') {
            sendJson(response, 200, { games });
            return;
          }
          if (!gameSlug && request.method === 'POST') {
            const game = await readRequestBody(request);
            validateGame(game);
            if (games.some((item) => item.slug === game.slug)) {
              sendJson(response, 409, { error: 'A game with this slug already exists.' });
              return;
            }
            const updated = { ...current, games: [...games, game] };
            await writeFile(gamesFile, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
            sendJson(response, 201, { game });
            return;
          }

          const gameIndex = games.findIndex((game) => game.slug === gameSlug);
          if (gameIndex < 0) {
            sendJson(response, 404, { error: 'Game not found.' });
            return;
          }

          if (request.method === 'PUT') {
            const game = await readRequestBody(request);
            validateGame(game);
            if (games.some((item, index) => index !== gameIndex && item.slug === game.slug)) {
              sendJson(response, 409, { error: 'A game with this slug already exists.' });
              return;
            }
            const updatedGames = [...games];
            updatedGames[gameIndex] = game;
            await writeFile(gamesFile, `${JSON.stringify({ ...current, games: updatedGames }, null, 2)}\n`, 'utf8');
            sendJson(response, 200, { game });
            return;
          }
          if (request.method === 'DELETE') {
            const updatedGames = games.filter((game) => game.slug !== gameSlug);
            await writeFile(gamesFile, `${JSON.stringify({ ...current, games: updatedGames }, null, 2)}\n`, 'utf8');
            sendJson(response, 200, { games: updatedGames });
            return;
          }

          sendJson(response, 405, { error: 'Method not allowed.' });
        } catch (error) {
          sendJson(response, 400, { error: error.message });
        }
      });
    },
  };
}

function validateGame(game) {
  if (!game || typeof game !== 'object' || Array.isArray(game)) {
    throw new Error('A game must be an object.');
  }
  if (typeof game.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(game.slug)) {
    throw new Error('Use a lowercase URL slug with words separated by hyphens.');
  }
  if (['title', 'genre', 'image', 'description'].some((field) => typeof game[field] !== 'string' || !game[field].trim())) {
    throw new Error('A game title, genre, image, and description are required.');
  }
  if (!Array.isArray(game.tags) || !Array.isArray(game.screenshots) || !Array.isArray(game.features)) {
    throw new Error('Game tags, screenshots, and features must be arrays.');
  }
  if (!game.tags.every((tag) => typeof tag === 'string') || !game.screenshots.every((image) => typeof image === 'string')) {
    throw new Error('Game tags and screenshots must contain text values.');
  }
  if (!game.features.every((feature) => (
    feature && typeof feature.title === 'string' && typeof feature.description === 'string'
  ))) {
    throw new Error('Each game feature must include a title and description.');
  }
  if (!game.requirements || typeof game.requirements !== 'object' || Array.isArray(game.requirements)) {
    throw new Error('Game requirements must be an object.');
  }
  if (['platform', 'players', 'release'].some((field) => typeof game.requirements[field] !== 'string')) {
    throw new Error('Game requirements must include platform, players, and release text.');
  }
  const hardwareFields = ['os', 'processor', 'memory', 'graphics', 'storage'];
  for (const tier of ['minimum', 'recommended']) {
    const hardware = game.requirements[tier];
    if (!hardware || typeof hardware !== 'object' || hardwareFields.some((field) => typeof hardware[field] !== 'string')) {
      throw new Error(`Game requirements must include complete ${tier} specifications.`);
    }
  }
}


export default defineConfig({
  plugins: [react(), jsonDataApi()],

    server: {
        host: '0.0.0.0',
        port: 5173,
        allowedHosts: true,
    },
})