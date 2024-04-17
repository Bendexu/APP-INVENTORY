import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {

  private notifycation = inject(ToastrService);
  private toolsForm = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  formpassword= this.toolsForm.group({
    'email': ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.formpassword.invalid) {
      this.notifycation.error('Debes completar todos los campos', 'Error'); 
      return;
    }
    this.authService.recover({
      email: this.formpassword.get('email')?.value ?? '',
    }).subscribe({
      next: (value) => {
        console.log(value);
        this.notifycation.success('Exito');
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {
        this.notifycation.error(err.message, 'Error');
      }
    })
  }
  

 
}

