import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { UserListComponent } from '../../../auth/components/user-list/user-list.component';
import { AuthService } from '../../../auth/secrvices/auth.service';
import { tap } from 'rxjs/operators';
import { User } from '../../../auth/models/User.model';
import { SharedService } from '../../../../shared.service';

@Component({
  selector: 'mmdb-home',
  imports: [UserListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService: AuthService = inject(AuthService);
  sharedService:SharedService = inject(SharedService)
   getUsersFromDb = computed(() => this.sharedService.getUsers());

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
