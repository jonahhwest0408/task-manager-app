import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ViewChild } from '@angular/core';

import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet, 
    HttpClientModule, 
    TaskListComponent,
    TaskFormComponent
  ]
})
export class AppComponent {
  title = 'Task Manager App';

  @ViewChild('taskList') taskListComponent!: TaskListComponent;

  reloadTasks() {
    if (this.taskListComponent) {
      this.taskListComponent.loadTasks();
    } else {
      console.warn('TaskListComponent not yet available.');
    }
  }
}
