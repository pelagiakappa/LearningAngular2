import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // -->118 Navigating Programmatically<--
  // We inject the Router.
  // -->136 Using a Fake Auth Service<--
  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  // -->118 Navigating Programmatically<--
  onLoadServers() {
    // ... complex calculation
    this.router.navigate(['/servers']); // absolute path
  }

  // -->124 Passing Query Parameters and Fragments<--
  // We passing the `id` to navigate, so this gets more dynamic
  // (now we aren't hard-coding `5` or something like this).
  onLoadServer(id: number) {
    // ... complex calculation
    this.router.navigate(['/servers', id, 'edit'],
      {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  // -->136 Using a Fake Auth Service<--
  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

}
