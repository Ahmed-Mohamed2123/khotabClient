import { NavService } from './../../services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer-website',
  templateUrl: './developer-website.component.html',
  styleUrls: ['./developer-website.component.scss']
})
export class DeveloperWebsiteComponent implements OnInit {

  constructor(private navShow: NavService) { }

  ngOnInit(): void {
    this.navShow.showfooter.next(false);
  }

}
