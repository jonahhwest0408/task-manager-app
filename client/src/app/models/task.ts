export interface Task {
    _id?: string;    
    title: string;
    description?: string;
    dueDate?: string;    
    status: 'pending' | 'in progress' | 'completed';
  }
  