  import { Component, inject } from '@angular/core';
  import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
  import { ToastrService } from 'ngx-toastr';
  import { AuthService } from '../../services/auth.service';
  import { ActivatedRoute, Router } from '@angular/router';

  @Component({
    selector: 'app-new-password',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './new-password.component.html',
    styleUrl: './new-password.component.css'
  })
  export class NewPasswordComponent {

    private toolsForm = inject(FormBuilder);
    private notifycation = inject(ToastrService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute); 

    
    token?: string; 
  
    formNewpassword = this.toolsForm.group({
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirm_password': ['', [Validators.required, Validators.minLength(8)]],
    });
  
    constructor() {
      this.route.queryParams.subscribe(params=> {
        this.token = params['token']; 
        console.log(this.token)
      });
    }
    
    onSubmit() {
      if (this.formNewpassword.invalid) {
        this.notifycation.error('Debes completar todos los campos', 'Error'); 
        return;
      }
      this.authService.resetPassword({
        password: this.formNewpassword.get('password')?.value ?? '',
        token: this.token??''
      }).subscribe({
        next: (value) => {
          this.notifycation.success(value, 'Exito');
          this.router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          this.notifycation.error(err.message, 'Error');
        }
      })
    }
  }
