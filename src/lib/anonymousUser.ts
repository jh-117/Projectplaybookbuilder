const ANONYMOUS_USER_KEY = 'playbook_anonymous_user_id';

export function getAnonymousUserId(): string {
  let userId = localStorage.getItem(ANONYMOUS_USER_KEY);

  if (!userId) {
    userId = generateAnonymousUserId();
    localStorage.setItem(ANONYMOUS_USER_KEY, userId);
  }

  return userId;
}

function generateAnonymousUserId(): string {
  return `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export function hasAnonymousUserId(): boolean {
  return localStorage.getItem(ANONYMOUS_USER_KEY) !== null;
}

export function clearAnonymousUserId(): void {
  localStorage.removeItem(ANONYMOUS_USER_KEY);
}
