import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { User } from '../../auth/models/User.model';
import { AuthService } from '../../auth/secrvices/auth.service';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  navOpen:boolean = false;
loggedUser:User|null = null
  
  constructor(private router: Router, private readonly authService:AuthService) {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      this.loggedUser = JSON.parse(loggedUser);
      this.authService.user.next(this.loggedUser)
    }
    else{
      this.loggedUser=null
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => {
          this.closeNav();
        })
      )
      .subscribe();
      this.authService.user.subscribe(user=>this.loggedUser=user)
  }

closeNav() {
    this.navOpen = false;
  }

  toggleNav() {
    this.navOpen=this.navOpen?false:true
  }

}
