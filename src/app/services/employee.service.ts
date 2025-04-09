import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 private apiUrl = 'http://localhost:9090/api/employees'; // Replace with your API URL
  constructor(private http : HttpClient) { }
  private employees : Employee[] = [
    {
      eId: 1,
      firstName: 'John',
      lastName: 'Doe',
      department: 'IT',
      dateOfHire: '2022-01-01',
      salary: 50000,   },
    {
      eId: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      department: 'HR',
      dateOfHire: '2021-06-15',
      salary: 60000,

    },
    {
      eId: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      department: 'Finance',
      dateOfHire: '2020-03-10',
      salary: 70000,
      email: '',
      phone: ''
    }
  ];
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }
  updateEmployee(employee: Employee): Observable<Employee | undefined> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.eId}`, employee);
  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
