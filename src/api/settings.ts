import { apiFetch } from './client';
import type { NotificationSettingsResponse, NotificationSettingsRequest } from '../types/api';

export function getNotificationSettings(): Promise<NotificationSettingsResponse> {
  return apiFetch<NotificationSettingsResponse>('/api/v1/settings/notifications');
}

export function updateNotificationSettings(
  req: NotificationSettingsRequest,
): Promise<NotificationSettingsResponse> {
  return apiFetch<NotificationSettingsResponse>('/api/v1/settings/notifications', {
    method: 'PATCH',
    body: JSON.stringify(req),
  });
}
