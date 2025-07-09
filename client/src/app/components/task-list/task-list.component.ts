import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule] 
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  error: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  enableEdit(task: Task) {
    task['backup'] = { ...task };
    task['editing'] = true;
  }
  
  cancelEdit(task: Task) {
    Object.assign(task, task['backup']); 
    task['editing'] = false;
    delete task['backup'];
  }
  
  updateTask(task: Task) {
    if (!task._id) return;
    this.taskService.updateTask(task._id, task).subscribe({
      next: () => {
        task['editing'] = false;
        delete task['backup'];
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }

  deleteTask(id: string | undefined) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }
}
