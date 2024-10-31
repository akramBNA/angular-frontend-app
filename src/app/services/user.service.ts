import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  subscribe() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://retoolapi.dev/HYd96h/data';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEmployees(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateEmployees(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteEmployees(id: number): Observable<string> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map(() => 'Employee deleted successfully!'), // Success message
      catchError((error) => {
        console.error('Error deleting employee:', error);
        return of('Failed to delete employee.'); // Error message
      })
    );
  }
}
