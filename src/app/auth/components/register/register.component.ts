import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../secrvices/auth.service';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'mmdb-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService:AuthService=inject(AuthService)
registerForm:FormGroup=new FormGroup({
  email:new FormControl(''),
  password:new FormControl('')
})

onSubmit(){
  this.authService.register(this.registerForm.value)
  .pipe(
    map((res)=>{
      if(res.success){
        this.registerForm.setValue({
          email:'',
          password:''
        })
      }
    }),
    catchError((err)=>{
      return of([])
    })
  )
  .subscribe()
}


}
