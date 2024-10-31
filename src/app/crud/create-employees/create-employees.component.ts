import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../services/user.service';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employees',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css'],
})
export class CreateEmployeesComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      imageUrl: ['', Validators.required],
      address: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.createEmployees(this.employeeForm.value).subscribe(
        (response) => {
          console.log('Employee added successfully:', response);
          Swal.fire({
            title: 'Success!',
            text: 'Employee added successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.employeeForm.reset();
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error adding employee:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add employee.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill out the form correctly.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      console.error('Form is invalid');
    }
  }
}
