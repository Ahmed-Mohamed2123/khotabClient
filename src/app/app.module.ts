import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { AdminLayoutComponent } from './main-dashboard/main-layouts/layout/admin-layouts/admin-layout/admin-layout.component';
import { LayoutModule } from './main-dashboard/main-layouts/layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationErrorComponent } from './main-components/application-error/application-error.component';
import { NavbarComponent } from './main-components/navbar/navbar.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { PageNotFoundComponent } from './main-components/page-not-found/page-not-found.component';
import { ResourceNotFoundComponent } from './main-components/resource-not-found/resource-not-found.component';
import { HomeComponent } from './main-components/home/home.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeveloperWebsiteComponent } from './main-components/developer-website/developer-website.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationErrorComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    ResourceNotFoundComponent,
    HomeComponent,
    AdminLayoutComponent,
    DeveloperWebsiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
