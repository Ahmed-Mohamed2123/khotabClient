import { SharedModule } from './../../../../shared/shared.module';
import { AdminLayoutRoutes } from './admin-layout-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    SharedModule
  ]
})
export class AdminLayoutsModule { }
