import { NavService } from './../../services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public navShow: NavService) {
  }

  ngOnInit(): void {
    this.navShow.showNavbar.next(true);
    this.navShow.showfooter.next(true);
  }

}
