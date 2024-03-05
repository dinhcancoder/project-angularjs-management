export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  projectID: number;
  employeeID: number;
  progress: number;
  employeeData: {
    username: string;
    avatar: string;
    roleID: number;
  };
}

export type TaskEdit = Omit<Task, 'employeeData' | 'employeeID' | 'projectID'>;
