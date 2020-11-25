import { AuthService } from './../../services/auth/auth.service';
import { NavService } from './../../services/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('menu', [
      state('true', style({
        maxHeight: '0'
      })),
      state('false', style({
        maxHeight: '450px'
      })),
      transition('true <=> false', animate('190ms'))
    ])
  ]
})
export class NavbarComponent implements OnInit {

  // trigger navbar
  current = 'true';

  // Show Navbar
  show: boolean;

  constructor(public navShow: NavService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.navShow.showNavbar.next(true);
    this.navShow.showNavbar.subscribe(data => {
      this.show = data;
    });
  }

  menu() {
    this.current = this.current === 'true' ? 'false' : 'true';
  }

}
