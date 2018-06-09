import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn;
  }

  logout() {
    this.authenticationService.logout().subscribe(
      data => this.handleLogout(data),
      error => console.log(error)
    );
  }

  private handleLogout(data) {
    if (!data.success) console.error('error logging out');

    this.tokenService.clearToken();
    alert('Logged out successfully');
    this.router.navigate(['/']);
  }
}
