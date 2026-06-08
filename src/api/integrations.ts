import { apiFetch } from './client';
import type {
  YouGileStatusResponse,
  ConnectRequest,
  ConnectResponse,
  BoardDto,
  BoardsResponse,
} from '../types/api';

export function getYougileStatus(): Promise<YouGileStatusResponse> {
  return apiFetch<YouGileStatusResponse>('/api/v1/integrations/yougile');
}

export function connectYougile(req: ConnectRequest): Promise<ConnectResponse> {
  return apiFetch<ConnectResponse>('/api/v1/integrations/yougile/connect', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

export function getBoards(): Promise<BoardDto[]> {
  return apiFetch<BoardsResponse>('/api/v1/integrations/yougile/boards').then((r) => r.boards);
}

export function selectBoard(boardId: string): Promise<void> {
  return apiFetch<void>(`/api/v1/integrations/yougile/boards/${boardId}/select`, {
    method: 'PUT',
  });
}
