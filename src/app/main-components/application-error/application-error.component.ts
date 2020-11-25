import { NavService } from './../../services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-error',
  templateUrl: './application-error.component.html',
  styleUrls: ['./application-error.component.scss']
})
export class ApplicationErrorComponent implements OnInit {

  constructor(private showFooter: NavService) { }

  ngOnInit(): void {
    this.showFooter.showfooter.next(false);
  }

}
