import { NavService } from './../../services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footer: boolean;
  constructor(public navShow: NavService) { }

  ngOnInit(): void {
    this.navShow.showfooter.next(true);
    this.navShow.showfooter.subscribe(data => {
      this.footer = data;
    });
  }

}
