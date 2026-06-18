import { API_BASE_URL, ensureOk, getNextId } from './adminApi'

export type OptionCake = {
  option_cake_id?: number
  category_name: string
}

export async function getOptions(): Promise<OptionCake[]> {
  const res = await fetch(`${API_BASE_URL}/api/options`)
  await ensureOk(res)
  return res.json()
}

export async function getOptionById(id: number): Promise<OptionCake | undefined> {
  const res = await fetch(`${API_BASE_URL}/api/options/${id}`)
  if (res.status === 404) return undefined
  await ensureOk(res)
  return res.json()
}

export async function createOption(opt: OptionCake): Promise<boolean> {
  const options = await getOptions()
  const body = {
    ...opt,
    option_cake_id: opt.option_cake_id ?? getNextId(options as unknown as Record<string, unknown>[], 'option_cake_id'),
  }
  const res = await fetch(`${API_BASE_URL}/api/options`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await ensureOk(res)
  return true
}

export async function updateOption(id: number, opt: OptionCake): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/options/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...opt, option_cake_id: id }),
  })
  await ensureOk(res)
  return true
}

export async function deleteOption(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/options/${id}`, { method: 'DELETE' })
  await ensureOk(res)
  return true
}

