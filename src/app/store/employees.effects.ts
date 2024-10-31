// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EmployeeService } from '../services/user.service';
// import {
//   getEmployees,
//   getEmployeesSuccess,
//   getEmployeesFailure,
// } from './employees.actions';
// import { catchError, map, of, switchMap } from 'rxjs';

// @Injectable()
// export class EmployeeEffects {
//   constructor(
//     private actions$: Actions,
//     private employeeService: EmployeeService
//   ) {}

//   loadEmployees$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(getEmployees),
//       switchMap(() => {
//         console.log('Fetching employees...');
//         return this.employeeService.getEmployees().pipe(
//           map((employees) => {
//             console.log('Employees fetched successfully:', employees);
//             return getEmployeesSuccess({ employees });
//           }),
//           catchError((error) => {
//             console.error('Error fetching employees:', error);
//             // Use a fallback message if error.message is undefined
//             const errorMessage = error.message || 'Failed to fetch employees';
//             return of(getEmployeesFailure({ error: errorMessage }));
//           })
//         );
//       })
//     )
//   );
// }
