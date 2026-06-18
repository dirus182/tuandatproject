const ADMIN_AUTH_KEY = 'bakeryAdminLoggedIn'
const ADMIN_USERNAME = 'postgres'
const ADMIN_PASSWORD = 'admin'

export function loginAdmin(username: string, password: string): boolean {
  const isValid = username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD

  if (isValid) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true')
  }

  return isValid
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_AUTH_KEY)
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true'
}
