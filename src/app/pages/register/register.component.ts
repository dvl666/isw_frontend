import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButton,
    MatIconModule,
    RouterModule,
    MatSelectModule
  ],
  // providers: [
  //   UserServicesService
  // ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerStudentForm: FormGroup
  registerTeacherForm: FormGroup
  userTypeSelect:string

  constructor(
    private fbTeacher: FormBuilder,
    private fbStudent: FormBuilder,
    private router: Router,
    private userService: UserServicesService,
    private readonly toastr: ToastrService
  ) {

    this.registerStudentForm = this.fbStudent.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      role: ['student']
    })

    this.registerTeacherForm = this.fbTeacher.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      specialty: ['', [Validators.required]],
      role: ['teacher']
    })

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public onChange(userType: string) {
    if (userType == 'student') {
      console.log(userType)
      this.userTypeSelect = 'student'
    }
    else {
      console.log(userType)
      this.userTypeSelect = 'teacher'
    }
  }

  onSubmitStudent() {
    if(this.registerStudentForm.valid) {
      const student: any = {
        email: this.registerStudentForm.get('email')!.value,
        password: this.registerStudentForm.get('password')!.value,
        name: this.registerStudentForm.get('name')!.value,
        contactNumber: this.registerStudentForm.get('contactNumber')!.value
      }
      console.log(student)
      this.userService.registerStudent( student.name, student.email, student.password, parseInt(student.contactNumber))
        .subscribe({
          next: (response) => {
            this.toastr.success('Felicidades ' + student.name + ' te has registrado de forma exitosa')
            this.router.navigate([''])
          },
          error: (error) => {
            this.toastr.error('Ha ocurrido un error')
          }
        })
    }
  }

  onSubmitTeacher() {
    if(this.registerTeacherForm.valid) {
      const teacher: any = {
        email: this.registerTeacherForm.get('email')!.value,
        password: this.registerTeacherForm.get('password')!.value,
        name: this.registerTeacherForm.get('name')!.value,
        specialty: this.registerTeacherForm.get('specialty')!.value,
        contactNumber: this.registerTeacherForm.get('contactNumber')!.value
      }
      console.log(teacher)
      this.userService.registerTeacher(teacher.email, teacher.name, teacher.password, teacher.specialty, parseInt(teacher.contactNumber))
        .subscribe({
          next: (response) => {
            this.toastr.success('Felicidades ' + teacher.name + ' te has registrado de forma exitosa')
            this.router.navigate([''])
          },
          error: (error) => {
            this.toastr.error('Ha ocurrido un error')
          }
        })
    }
  }

  togglePasswordVisibility() {
    const passwordField = document.getElementById('reg-password') as HTMLInputElement;
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }

}
