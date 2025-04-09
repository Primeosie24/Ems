import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-empolyee-list',
  templateUrl: './empolyee-list.component.html',
  styleUrls: ['./empolyee-list.component.scss']
})
export class EmpolyeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isAdmin: boolean = true

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  onDelete(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.getEmployees();
    });
  }
  }
  onEdit(employee: Employee): void {
    this.selectedEmployee = employee;
  }
  onAdd(employee: Employee): void {
    this.employeeService.addEmployee(employee).subscribe(() => {
      this.getEmployees();
    });
  }
  onUpdate(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.getEmployees();
    });
  }
  onCancel(): void {
    this.selectedEmployee = null;
  }
  onSave(employee: Employee): void {
    if (this.selectedEmployee) {
      this.onUpdate(employee);
    } else {
      this.onAdd(employee);
    }
  }
  

}
