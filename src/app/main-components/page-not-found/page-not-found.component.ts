import { NavService } from './../../services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private navShwo: NavService) { }

  ngOnInit(): void {
    this.navShwo.showNavbar.next(false);
    this.navShwo.showfooter.next(false);
  }

}
