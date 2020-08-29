import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user
  role

  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.infoUser();
    this.role = this.user.role
   }

  ngOnInit(): void {
  }

}
