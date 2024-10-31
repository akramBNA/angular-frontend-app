import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatSort, MatSortable, MatSortModule } from '@angular/material/sort';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-employees',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatPaginator,
    RouterModule,
    RouterOutlet,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './show-all-employees.component.html',
  styleUrls: ['./show-all-employees.component.css'],
})
export class ShowAllEmployeesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'age',
    'dob',
    'contactNumber',
    'email',
    'address',
    'salary',
  ];
  employeesData: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  pageSize: number = 10;
  pageSizes: number[] = [10, 30, 70];
  dataLength: number = 0;
  filteredEmployees: any = [];
  isLoading: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeesService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchEmployees();
    this.cdr.detectChanges();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  fetchEmployees() {
    this.isLoading = true;
    this.employeesService.getEmployees().subscribe((data: any[]) => {
      if (data) {
        this.isLoading = false;
        this.employeesData = data;
        this.dataLength = data.length;
        console.log('employees data ==> ', this.employeesData);
        console.log('data length ===> ', this.dataLength);
        this.dataSource.data = this.employeesData.slice(0, this.pageSize);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  onPageSizeChange(event: MatSelectChange) {
    this.pageSize = event.value;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = 0;
    this.dataSource.data = this.employeesData.slice(0, this.pageSize);
    this.paginator.length = this.employeesData.length;
  }

  onPageChange(event: any) {
    this.dataLength = this.employeesData.length;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.employeesData.slice(startIndex, endIndex);
    this.cdr.detectChanges();
  }

  updateEmployee(employee: any) {
    this.router.navigate(['/update-employee', employee.id]);
  }

  deleteEmployee(id: number) {
    const confirmDelete = Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    confirmDelete.then((result) => {
      if (result.isConfirmed) {
        this.employeesService.deleteEmployees(id).subscribe(
          (message) => {
            Swal.fire('Deleted!', message, 'success');
            this.fetchEmployees();
          },
          (error) => {
            console.error('Error deleting employee:', error);
            Swal.fire('Error!', error, 'error');
          }
        );
      }
    });
  }

  searchByName(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredEmployees = this.employeesData;
      this.dataSource.data = this.filteredEmployees.slice(0, this.pageSize);
      this.dataLength = this.employeesData.length;
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      this.filteredEmployees = this.employeesData.filter((employee) => {
        const firstName = employee.firstName || '';
        return firstName.toLowerCase().includes(lowerCaseSearchTerm);
      });
      this.dataSource.data = this.filteredEmployees.slice(0, this.pageSize);
      this.paginator.firstPage();
      this.dataLength = this.filteredEmployees.length;
    }
  }
}
