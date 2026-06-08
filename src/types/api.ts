export interface ProfileResponse {
  telegramId: number;
  username: string;
  fullName: string;
  yougileConnected: boolean;
  yougileRole: string;
  stats: StatsDto;
}

export interface StatsDto {
  activeTasks: number;
  doneTasks: number;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface TaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  statusLabel: string;
  deadline: string | null;
  assigneeIds: string[];
}

export interface TasksResponse {
  tasks: TaskDto[];
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface YouGileStatusResponse {
  connected: boolean;
  companyId: string | null;
  yougileUserId: string | null;
  role: string | null;
}

export interface ConnectRequest {
  email: string;
  password: string;
  companyId?: string;
}

export interface ConnectResponse {
  connected: boolean;
  requiresCompanySelection: boolean;
  companies: CompanyDto[];
  boards: BoardDto[];
}

export interface CompanyDto {
  id: string;
  name: string;
}

export interface BoardDto {
  id: string;
  name: string;
  isDefault: boolean;
}

export interface BoardsResponse {
  boards: BoardDto[];
}

export interface NotificationSettingsResponse {
  digestEnabled: boolean;
  remindersEnabled: boolean;
}

export interface NotificationSettingsRequest {
  digestEnabled?: boolean;
  remindersEnabled?: boolean;
}
