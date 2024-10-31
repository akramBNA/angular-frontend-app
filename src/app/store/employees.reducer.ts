// import { createReducer, on } from '@ngrx/store';
// import {
//   getEmployees,
//   getEmployeesSuccess,
//   getEmployeesFailure,
// } from './employees.actions';

// export interface EmployeeState {
//   employees: any[];
//   loading: boolean;
//   error: string | null;
// }

// export const initialState: EmployeeState = {
//   employees: [],
//   loading: false,
//   error: null,
// };

// export const employeeReducer = createReducer(
//   initialState,
//   on(getEmployees, (state) => {
//     console.log('Loading employees action dispatched');
//     return {
//       ...state,
//       loading: true,
//       error: null,
//     };
//   }),

//   on(getEmployeesSuccess, (state, { employees }) => {
//     console.log('Employees loaded successfully:', employees);
//     return {
//       ...state,
//       loading: false,
//       employees,
//     };
//   }),
//   on(getEmployeesFailure, (state, { error }) => {
//     console.error('Failed to load employees:', error);
//     return {
//       ...state,
//       loading: false,
//       error,
//     };
//   })
// );
