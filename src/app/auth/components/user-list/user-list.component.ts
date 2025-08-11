import { Component, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../secrvices/auth.service';
import { User } from '../../models/User.model';
import { map } from 'rxjs';

@Component({
  selector: 'mmdb-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: WritableSignal<User[]> = signal([]);
  constructor(private readonly authService: AuthService) {}
  ngOnInit(): void {
    this.authService
      .getUsers()
      .pipe(
        map((res: any) => {
          this.users.set(res);
          return res;
        })
      )
      .subscribe();
  }
}
