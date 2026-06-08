export type TaskStatus = 'active' | 'overdue' | 'completed';

export interface Task {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  status: TaskStatus;
}

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Исправить баг авторизации',
    assignee: 'Александр',
    deadline: '2026-06-05',
    status: 'active',
  },
  {
    id: '2',
    title: 'Написать документацию API',
    assignee: 'Артём',
    deadline: '2026-06-07',
    status: 'active',
  },
  {
    id: '3',
    title: 'Настроить Docker Compose',
    assignee: 'Александр',
    deadline: '2026-06-01',
    status: 'overdue',
  },
  {
    id: '4',
    title: 'Ревью пулл реквеста',
    assignee: 'Никита',
    deadline: '2026-05-30',
    status: 'completed',
  },
];
