export const TOKEN_KEY = '@airbnb-Token'
export const EMAIL_SAVED = 'email@email.com'
export const PASSWORD_SAVED = 'password'

export async function isAuthenticated(): Promise<boolean> {
  const authenticated = localStorage.getItem(TOKEN_KEY)

  if (authenticated !== null) {
    return true
  }
  return false
}

export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY)
  return token
}

export function login(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}
export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
}
export function remenber(email: string, password: string): void {
  localStorage.setItem(EMAIL_SAVED, email)
  localStorage.setItem(PASSWORD_SAVED, password)
}
export function dontRemenber(): void {
  localStorage.removeItem(EMAIL_SAVED)
  localStorage.removeItem(PASSWORD_SAVED)
}
