import { Component, OnInit } from '@angular/core';
import { StudentNavbarComponent } from "./components/student-navbar/student-navbar.component";
import { RouterOutlet } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';
import { ClassService } from '../../services/class.service';
import { ClassCardComponent } from "./components/class-card/class-card.component";

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [StudentNavbarComponent, ClassCardComponent],
  // providers: [
  //   ClassService,
  //   UserServicesService
  // ],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent implements OnInit {

  classes: any[] = []
  studentId: number 
  // isLoading: boolean = true

  constructor(
    private classService: ClassService,
    private userService: UserServicesService
  ) {}

  async ngOnInit() {
    console.log('ola', this.studentId)
    this.studentId = this.userService.getUserId()
    this.classService.getClassesNotEnrolledByStudent(this.studentId)
    .subscribe({
      next: (response) => {
        this.classes = response
        // this.isLoading = false
        console.log(this.classes)
      },
      error: (error) => {
        console.log(error)
      }
    })
    console.log(this.studentId)
  }

}
