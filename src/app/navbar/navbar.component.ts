import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn;
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('rmd-token');
    this.router.navigate(['/']);
  }
}
