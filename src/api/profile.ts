import { apiFetch } from './client';
import type { ProfileResponse } from '../types/api';

export function getProfile(): Promise<ProfileResponse> {
  return apiFetch<ProfileResponse>('/api/v1/user/profile');
}
