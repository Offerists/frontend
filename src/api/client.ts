import WebApp from '@twa-dev/sdk';

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8081';

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  try {
    const initData = WebApp.initData;
    if (initData) {
      headers['X-Telegram-Init-Data'] = initData;
      return headers;
    }
    const userId = WebApp.initDataUnsafe?.user?.id;
    if (userId) {
      headers['X-Dev-Telegram-User-Id'] = String(userId);
    }
  } catch {
    // not in Telegram context
  }
  return headers;
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options?.headers },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
