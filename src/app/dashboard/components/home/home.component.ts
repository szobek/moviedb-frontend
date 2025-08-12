import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserListComponent } from '../../../auth/components/user-list/user-list.component';
import { AuthService } from '../../../auth/secrvices/auth.service';
import { tap } from 'rxjs/operators';
import { User } from '../../../auth/models/User.model';

@Component({
  selector: 'mmdb-home',
  imports: [UserListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService: AuthService = inject(AuthService);
@Output() getUsers: EventEmitter<any>=new EventEmitter();
  refreshToken() {
    this.authService
      .updateAccessToken()
      .pipe(
        tap((res: any) => {
          console.log(res);
          const user: User = this.authService.user.value as User;
          user.accessToken = res.access_token;
          console.log(user);
          
          this.authService.user.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
      )
      .subscribe();
  }
}
