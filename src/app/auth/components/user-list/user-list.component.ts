import { Component, computed, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../secrvices/auth.service';
import { User } from '../../models/User.model';
import { map, tap } from 'rxjs';
import { SharedService } from '../../../../shared.service';

@Component({
  selector: 'mmdb-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: WritableSignal<User[]> = signal([]);
  getUsersFromDb = computed(() => this.sharedService.getUsers());
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.getAllUserFromDb();
  }
  approve(user: User) {
    this.authService
    .approveUser(user)
    .pipe(
      tap((res: any) => {
          if(res.success){
            this.getAllUserFromDb()
          }
          return res;
        })
      )
      .subscribe();
  }

  getAllUserFromDb() {
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
  promote(user: User) {
    this.authService.promoteUser(user)
    .pipe(
      tap((res: any) => {
          if(res.success){
            this.getAllUserFromDb()
          }
          return res;
        })
    )
    .subscribe();
  }
}
