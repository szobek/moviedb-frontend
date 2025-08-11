import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../secrvices/auth.service';
import { catchError, of, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'mmdb-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  router:Router = inject(Router)
  error: any = null;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('test@test.com'),
    password: new FormControl('password'),
  });

  constructor(){
    if(this.authService.user.value){
      this.router.navigate(['/movies'])
    }
  }

  onSubmit() {
    this.authService
      .login(this.loginForm.value)
      .pipe(
        tap((res) => {
          this.authService.user.next(res.user)
          
          this.loginForm.setValue({
            email: '',
            password: '',
          });
          this.error = null;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/movies']);
        }),
        catchError((err) => {
          this.error = err.error;
          return of([]);
        })
      )
      .subscribe();
  }
}
