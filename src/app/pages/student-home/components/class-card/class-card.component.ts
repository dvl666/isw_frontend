import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserServicesService } from '../../../../services/user-services.service';
import { ClassService } from '../../../../services/class.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-class-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.scss'
})
export class ClassCardComponent {

  @Input() class: any;
  click: boolean = false

  constructor(
    private userService: UserServicesService,
    private classService: ClassService,
    private toastr: ToastrService
  ) {}

  onClick() {
    this.click = true
    const studentId = this.userService.getUserId()
    this.classService.addStudent(this.class.id, studentId)
    .subscribe({
      next: (response) => {
        this.toastr.success('Te has inscrito a ' + this.class.title)
      },
      error: (error) => {
        this.toastr.error('Se ha producido un error')
      }
    })
  }

}
