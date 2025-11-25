import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIcon
  ],
  templateUrl: './teacher-navbar.component.html',
  styleUrl: './teacher-navbar.component.scss'
})
export class TeacherNavbarComponent {

}
