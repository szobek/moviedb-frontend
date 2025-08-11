import { Component } from '@angular/core';
import { UserListComponent } from '../../../auth/components/user-list/user-list.component';

@Component({
  selector: 'mmdb-home',
  imports: [UserListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
