import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // MUST import this

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]  // MUST include HttpClientModule here
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

  deleteTask(id: string | undefined) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }
}
