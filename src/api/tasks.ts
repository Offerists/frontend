import { apiFetch } from './client';
import type { TaskDto, TasksResponse, UpdateTaskStatusRequest } from '../types/api';

export function getTasks(filter: 'active' | 'all' = 'active'): Promise<TaskDto[]> {
  return apiFetch<TasksResponse>(`/api/v1/tasks?filter=${filter}`).then((r) => r.tasks);
}

export function updateTaskStatus(taskId: string, req: UpdateTaskStatusRequest): Promise<TaskDto> {
  return apiFetch<TaskDto>(`/api/v1/tasks/${taskId}/status`, {
    method: 'PATCH',
    body: JSON.stringify(req),
  });
}
