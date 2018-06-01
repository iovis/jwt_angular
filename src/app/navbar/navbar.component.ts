import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn;
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
    console.log('logout');
  }
}
