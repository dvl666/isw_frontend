import { Component, Input } from '@angular/core';
import { UserServicesService } from '../../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  providers: [
    UserServicesService
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  constructor(
    private readonly userService: UserServicesService,
    private readonly toastr: ToastrService
  ) {}

  @Input() users: any[]

  public acceptUser(user: any){
    this.userService.acceptTeacherRequest(user.id).subscribe({
      next: (response) => {
        this.users = this.users.filter(u => u.id !== user.id);
        this.toastr.success('Se a aceptado la solicitud con exito.')
        console.log('User accepted:', response);
      },
      error: (err) => {
        console.error('Error accepting user', err);
      }
    });
  }

  public denyUser(user: any){
    this.toastr.success('Se a aceptado la solicitud con exito.')
  }

}
