import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../../../services/class.service';
import { UserServicesService } from '../../../../services/user-services.service';

@Component({
  selector: 'app-class-card-2',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './class-card-2.component.html',
  styleUrl: './class-card-2.component.scss'
})
export class ClassCard2Component implements OnInit {

  studentId: number

  constructor(
    private toastr: ToastrService,
    private classService: ClassService,
    private userService: UserServicesService,
  ) {}

  async ngOnInit() {
    this.studentId = this.userService.getUserId()
  }

  click: boolean = false

  @Input() class: any

  onClick(classId: number){
    this.click = !this.click
    this.classService.removeStudentFromClass(classId, this.studentId)
      .subscribe({
        next: (response) => {
          this.toastr.success('Se a eliminado tu inscripcion a ' + this.class.title)
        },
        error: (error) => {
          this.toastr.error('Se a producido un error')
        }
      })
    console.log('a')
  }

}
