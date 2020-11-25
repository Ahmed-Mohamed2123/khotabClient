import { NavService } from './../../../../../services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private navShow: NavService) { }

  ngOnInit(): void {
    this.navShow.showNavbar.next(false);
    this.navShow.showfooter.next(false);
  }

}
