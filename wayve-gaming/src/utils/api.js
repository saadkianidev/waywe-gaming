export async function readJsonResponse(response, fallbackMessage) {
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    throw new Error(fallbackMessage);
  }

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || fallbackMessage);
  }

  return result;
}

export function productionApiMessage(action) {
  return `${action} is only available while running the Vite dev server.`;
}

export function getStoredItems(key, fallbackItems = []) {
  if (typeof window === 'undefined') return fallbackItems;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

export function setStoredItems(key, items) {
  window.localStorage.setItem(key, JSON.stringify(items));
  return items;
}
export function addStoredItem(key, item, fallbackItems = []) {
  const items = [...getStoredItems(key, fallbackItems), item];
  window.localStorage.setItem(key, JSON.stringify(items));
  return item;
}

export function createClientSubmission(prefix, form) {
  return {
    ...form,
    id: `${prefix}-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };
}