import { DeveloperWebsiteComponent } from './main-components/developer-website/developer-website.component';
import { PageNotFoundComponent } from './main-components/page-not-found/page-not-found.component';
import { ApplicationErrorComponent } from './main-components/application-error/application-error.component';
import { ResourceNotFoundComponent } from './main-components/resource-not-found/resource-not-found.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminLayoutComponent } from './main-dashboard/main-layouts/layout/admin-layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './main-components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'developer-website',
    component: DeveloperWebsiteComponent
  },
  {
    path: 'audio',
    loadChildren: () => import('./main-modules/audio/audio.module').then(a => a.AudioModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./main-modules/video/video.module').then(a => a.VideoModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./main-dashboard/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren:
        () => import('./main-dashboard/main-layouts/layout/admin-layouts/admin-layouts.module').then(a => a.AdminLayoutsModule)
      }
    ]
  },
  {
    path: 'notFoundResource/:status',
    component: ResourceNotFoundComponent
  },
  {
    path: 'applicationError/:status',
    component: ApplicationErrorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
