import { NavService } from './../../services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-not-found',
  templateUrl: './resource-not-found.component.html',
  styleUrls: ['./resource-not-found.component.scss']
})
export class ResourceNotFoundComponent implements OnInit {

  constructor(private showFooter: NavService) { }

  ngOnInit(): void {
    this.showFooter.showfooter.next(false);
  }

}
