import { Buffer } from 'node:buffer';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDirectory = dirname(fileURLToPath(import.meta.url));
const applicationsFile = resolve(rootDirectory, 'src/data/careerApplications.json');

function careerApplicationsApi() {
  return {
    name: 'career-applications-api',
    configureServer(server) {
      server.middlewares.use('/api/applications', async (request, response, next) => {
        if (request.method !== 'POST') {
          next();
          return;
        }

        try {
          const chunks = [];
          for await (const chunk of request) chunks.push(chunk);
          const form = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const current = JSON.parse(await readFile(applicationsFile, 'utf8'));
          const application = {
            id: `application-${Date.now()}`,
            submittedAt: new Date().toISOString(),
            ...form,
          };
          const updated = {
            ...current,
            form: { ...current.form, ...form },
            applications: [...current.applications, application],
          };

          await writeFile(applicationsFile, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
          response.statusCode = 201;
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify({ application }));
        } catch (error) {
          response.statusCode = 400;
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify({ error: error.message }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), careerApplicationsApi()],
  server: {
    allowedHosts: ['salary-barber-geometry.ngrok-free.dev'],
  },
});