import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slidebarDashboard',
  templateUrl: './slidebarDashboard.component.html',
  styleUrls: ['./slidebarDashboard.component.scss']
})
export class SlidebarDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const slidebar = document.getElementById('slidebar');
    const main = document.getElementById('main');
    window.onresize = () => {
      if (window.innerWidth > 768) {
        slidebar.classList.add('toggleSlideHide');
        slidebar.classList.remove('toggleSlideShow');
        // Main Content
        main.classList.add('ShowMain');
        main.classList.remove('HideMain');
      } else {
        slidebar.classList.remove('toggleSlideHide');
        slidebar.classList.add('toggleSlideShow');
        // Main Content
        main.classList.remove('ShowMain');
        main.classList.add('HideMain');
      }
    };

    window.onload = () => {
      if (window.innerWidth < 768) {
        slidebar.classList.add('toggleSlideHide');
        slidebar.classList.remove('toggleSlideShow');
        // Main Content
        main.classList.add('ShowMain');
        main.classList.remove('HideMain');
      } else {
        slidebar.classList.remove('toggleSlideHide');
        slidebar.classList.add('toggleSlideShow');
        // Main Content
        main.classList.remove('ShowMain');
        main.classList.add('HideMain');
      }
    };
  }

  slide() {

  }

}
