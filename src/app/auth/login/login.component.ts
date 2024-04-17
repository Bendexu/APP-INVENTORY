import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  private notifycation = inject(ToastrService);
  private toolsForm = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);


  formIniciar= this.toolsForm.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.formIniciar.invalid) {
      this.notifycation.error('Debes completar todos los campos', 'Error'); 
      return;
    }
    this.authService.login({
      email: this.formIniciar.get('email')?.value ?? '',
      password: this.formIniciar.get('password')?.value ?? '',

    }).subscribe({
      next: (value) => {
        console.log(value);
        this.notifycation.success('Exito');
        this.router.navigateByUrl('/pages/home');
      },
      error: (err) => {
        this.notifycation.error(err.message, 'Error');
      }
    })
  }

  
}
