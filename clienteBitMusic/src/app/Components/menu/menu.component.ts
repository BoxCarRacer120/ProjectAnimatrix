import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user;
  apiURL: String;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.apiURL = this.userService.apiURL;
    this.userService.authenticate$.subscribe(
      userAuth => {

        this.user = userAuth

      }
    )
  }

  ngOnInit(): void {
  }

  destroySession() {
    this.userService.removeToken();
    this.router.navigate(['/']);

  }

}
