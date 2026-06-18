export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export function getNextId<T extends Record<string, unknown>>(items: T[], key: keyof T): number {
  const maxId = items.reduce((currentMax, item) => {
    const value = Number(item[key] ?? 0)
    return Number.isFinite(value) && value > currentMax ? value : currentMax
  }, 0)

  return maxId + 1
}

export async function ensureOk(response: Response): Promise<void> {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed: ${response.status}`)
  }
}
