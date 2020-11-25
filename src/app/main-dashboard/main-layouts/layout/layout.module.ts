import { SharedModule } from './../../../shared/shared.module';
import { NavbarDashboardComponent } from './navbarDashboard/navbarDashboard.component';
import { SlidebarDashboardComponent } from './slidebarDashboard/slidebarDashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SlidebarDashboardComponent, NavbarDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavbarDashboardComponent,
    SlidebarDashboardComponent
  ]
})
export class LayoutModule { }
