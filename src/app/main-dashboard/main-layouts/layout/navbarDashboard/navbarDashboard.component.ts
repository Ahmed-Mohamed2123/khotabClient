import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbarDashboard',
  templateUrl: './navbarDashboard.component.html',
  styleUrls: ['./navbarDashboard.component.scss']
})
export class NavbarDashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  triggerDrop() {
    document.getElementById('drop').style.display = 'block';
  }

  slideToggle() {
    const slidebar = document.getElementById('slidebar');
    const main = document.getElementById('main');
    if (slidebar.classList.contains('toggleSlideShow')) {
      slidebar.classList.add('toggleSlideHide');
      slidebar.classList.remove('toggleSlideShow');
      // Main Content
      if (window.innerWidth > 768) {
        main.classList.add('ShowMain');
        main.classList.remove('HideMain');
      }

    } else {
      slidebar.classList.add('toggleSlideShow');
      slidebar.classList.remove('toggleSlideHide');
      // Main Content
      if (window.innerWidth > 768) {
        main.classList.remove('ShowMain');
        main.classList.add('HideMain');
      }
    }
  }

  logedOut() {
    this.authService.userLogout();
  }

}
