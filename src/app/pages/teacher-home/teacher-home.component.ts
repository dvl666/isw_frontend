import { Component } from '@angular/core';
import { TeacherNavbarComponent } from "./components/teacher-navbar/teacher-navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-home',
  standalone: true,
  imports: [
    TeacherNavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './teacher-home.component.html',
  styleUrl: './teacher-home.component.scss'
})
export class TeacherHomeComponent {

}
