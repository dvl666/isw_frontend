import { Component, signal } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButton,
    MatIconModule,
    RouterModule,
  ],
  // providers: [
  //   UserServicesService
  // ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userForm: FormGroup
  swButton: boolean
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServicesService,
    private classService: ClassService,
    private readonly toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  
  onSubmit() {
    if(this.userForm.valid) {
      const user: any = {
        email: this.userForm.get('email')!.value,
        password: this.userForm.get('password')!.value
      }
      this.userService.logIn(user.email, user.password).subscribe({
        next: (response) => {
          this.swButton = false
          console.log(response)
          if(response.role === 'student') {
            this.userService.setUpId(response.id)
            this.toastr.success('Se a iniciado sesion de manera correcta')
            this.router.navigate(['/student-home'])
            return
          }
          if(response.role === 'admin') {
            this.toastr.success('Se a iniciado sesion de administrador de manera correcta')
            this.router.navigate(['/admin-table'])
            return
          }
          if(response.role === 'teacher' && response.active === true) {
            this.classService.setTeacherId(response.id)
            this.toastr.success('Se a iniciado sesion de manera correcta')
            this.router.navigate(['/teacher-home'])
          } else {
            this.toastr.error('Su cuenta aun no a sido activada')
            return
          } 
          const userId = this.userService.getUserId()
          console.log('El id del usuario es', this.userService.getUserId())
        },
        error: (error) => {
          this.swButton = true
          this.toastr.error('Credenciales invalidas')
          console.error(error)
        }
      })
    }
  }
  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
