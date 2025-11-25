import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  id: number

  constructor(
    private readonly http: HttpClient
  ) { }

  private apiUrl = 'http://localhost:3000'

  setUpId(id: number) {
    this.id = id
  }

  getUserId() {
    return this.id
  }

  registerStudent(name: string, email: string, password: string, contactNumber: number): Observable<any> {
    return this.http.post(this.apiUrl + '/user/create-student', { email: email, password: password, name: name, contactNumber: contactNumber })
  }

  registerTeacher(email: string, name: string , password: string, specialty: string, contactNumber: number): Observable<any> {
    return this.http.post(this.apiUrl + '/user/create-teacher', { email: email, password: password, name: name, specialty: specialty, contactNumber: contactNumber })
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/user/login', { email: email, password: password })
  }

  getTeachers(): Observable<any> {
    return this.http.get(this.apiUrl+'/user')
  }

  acceptTeacherRequest(teacherId: string): Observable<any> {
    console.log(teacherId)
    return this.http.post(this.apiUrl +'/user/accept-request/', {id: teacherId })
  }

}
