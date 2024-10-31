import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ShowAllEmployeesComponent} from '../app/crud/show-all-employees/show-all-employees.component'
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShowAllEmployeesComponent,CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-frontend-app';
}
