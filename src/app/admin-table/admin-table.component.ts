import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [
    HttpClientModule,
    TableComponent
  ],
  providers: [
    UserServicesService
  ],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss'
})
export class AdminTableComponent implements OnInit {

  teachers: any[]

  constructor(
    private readonly userService: UserServicesService
  ) {}

  ngOnInit() {
    this.userService.getTeachers().subscribe({
      next: (users) => {
        this.teachers = users.filter(user => user.active === false)
        console.log(this.teachers)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
