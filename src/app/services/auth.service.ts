import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

interface DataRegister {
  name: string,
  lastName: string,
  dni:number;
  dateOfBirth: Date;
  gender: string;
  email: string,
  password: string
}

interface DataLogin{
  email: string,
  password: string
}

interface Datapassword{
  email: string,
}

interface Datanewpassword{
  password: string
  token:string
}




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerAndRedirectToLogin(value: Partial<{ name: string | null; lastName: string | null; dni: string | null; date: string | null; gender: string | null; email: string | null; password: string | null; confirm_password: string | null; }>) {
    throw new Error('Method not implemented.');
  }
  
  // 
  private httpService = inject(HttpClient);
  // 
  private auth_end_point = 'http://localhost:3000';
  constructor() { }
  
  register(data: DataRegister): Observable<any> {
    return this.httpService.post(this.auth_end_point+'/registrar_usuario', { ...data });
  }
  
  login(data: DataLogin): Observable<any> {
    return this.httpService.post(this.auth_end_point+'/login', { ...data });
  }
  
  recover(data: Datapassword): Observable<any> {
    return this.httpService.post(this.auth_end_point+'/recover', { ...data });
  }

  resetPassword(data: Datanewpassword): Observable<any> {
    return this.httpService.post(this.auth_end_point+'/reset-password',{... data});
  }
  
  

}
