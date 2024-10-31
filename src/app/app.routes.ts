import { Routes } from '@angular/router';
import { ShowAllEmployeesComponent } from './crud/show-all-employees/show-all-employees.component';
import { CreateEmployeesComponent } from './crud/create-employees/create-employees.component';
import { UpdateEmployeesComponent } from './crud/update-employees/update-employees.component';
export const routes: Routes = [
    { path: '', component: ShowAllEmployeesComponent }, // Default route
    { path: 'add-employee', component: CreateEmployeesComponent },
    { path: 'update-employee/:id', component: UpdateEmployeesComponent }, // Route for updating employee

    // Add other routes as needed
];
