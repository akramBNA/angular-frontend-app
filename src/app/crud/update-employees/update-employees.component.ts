import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.css'],
})
export class UpdateEmployeesComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: number = 1;
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
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

  ngOnInit() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployeeData(this.employeeId);
  }

  loadEmployeeData(id: number) {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe((employees) => {
      const employee = employees.find((emp) => emp.id === id);
      if (employee) {
        this.employeeForm.patchValue(employee);
      }
      this.isLoading = false;
    });
  }

  onSubmit() {
    // if (this.employeeForm.valid) {
    const updatedEmployee = { id: this.employeeId, ...this.employeeForm.value };
    this.employeeService.updateEmployees(updatedEmployee).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Employee updated successfully!',
          icon: 'success',
        });
        this.router.navigate(['/']);
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update employee.',
          icon: 'error',
        });
      }
    );
    // } else {
    //   Swal.fire({
    //     title: 'Error!',
    //     text: 'Invalid data ! Try again',
    //     icon: 'error',
    //   });
    // }
  }
}
