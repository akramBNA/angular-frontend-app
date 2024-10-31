import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployesState } from "./employees.state";

export const selectEmployeesState = createFeatureSelector<EmployesState>('employees');
export const selectEmployeesList = createSelector(selectEmployeesState, (state: EmployesState) => {
    return {
       employees:state.employees
    }
})

// export const selectLoadingSpinner = createSelector(selectEmployeesState, (state: EmployesState) => {
//     return {
//         isLoading: state.isLoading
//     }
// })

