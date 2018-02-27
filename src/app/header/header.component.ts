import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentification.service';
import {User} from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private showHeader = true;
  currentUser: User;
  constructor(private authentificationService: AuthenticationService) {
    this.authentificationService.getHeaderStatus().subscribe(result => {
      this.showHeader = !result;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
