import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  newTask: Partial<Task> = {
    title: '',
    description: '',
    status: 'pending'
  };

  constructor(private taskService: TaskService) {}

  @Output() taskCreated = new EventEmitter<void>();


  createTask() {
    if (!this.newTask.title || !this.newTask.description) return;
  
    this.taskService.createTask(this.newTask as Task).subscribe(() => {
      this.newTask = {
        title: '',
        description: '',
        status: 'pending'
      };
      this.taskCreated.emit(); 
    });
  }
}
