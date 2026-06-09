import WebApp from '@twa-dev/sdk';

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  try {
    const initData = WebApp.initData;
    console.log('[auth] initData:', initData ? `${initData.slice(0, 40)}...` : 'EMPTY');
    console.log('[auth] user:', WebApp.initDataUnsafe?.user);
    if (initData) {
      headers['X-Telegram-Init-Data'] = initData;
      return headers;
    }
    const userId = WebApp.initDataUnsafe?.user?.id;
    if (userId) {
      headers['X-Dev-Telegram-User-Id'] = String(userId);
    }
  } catch (e) {
    console.error('[auth] SDK error:', e);
  }
  return headers;
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { ...getAuthHeaders(), ...options?.headers },
    });
  } catch {
    // сеть недоступна / запрос не ушёл
    throw new Error('Не удалось соединиться с сервером');
  }

  // Читаем тело как текст и парсим вручную: так не-JSON ответ (например,
  // HTML-страница от неправильно настроенного прокси) даёт понятную ошибку,
  // а не сырое сообщение движка вроде "The string did not match the expected pattern".
  const raw = await res.text();
  let data: unknown;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(res.ok ? 'Сервер вернул неожиданный ответ' : `HTTP ${res.status}`);
    }
  }

  if (!res.ok) {
    const message = (data as { error?: string } | undefined)?.error ?? `HTTP ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}
