import { Component, OnInit } from '@angular/core';
import { StudentNavbarComponent } from "../student-home/components/student-navbar/student-navbar.component";
import { ClassCard2Component } from './components/class-card-2/class-card-2.component';
import { ClassService } from '../../services/class.service';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-student-inscriptions',
  standalone: true,
  imports: [StudentNavbarComponent, ClassCard2Component],
  templateUrl: './student-inscriptions.component.html',
  styleUrl: './student-inscriptions.component.scss'
})
export class StudentInscriptionsComponent implements OnInit {

  classes: any[] = []
  studentId: number

  constructor(
    private classService: ClassService,
    private userService: UserServicesService
  ) {}

  async ngOnInit() {
    this.studentId = await this.userService.getUserId()
    this.classService.getClassesForStudent(this.studentId)
      .subscribe({
        next: (response) => {
          this.classes = response
          console.log(this.classes)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

}
