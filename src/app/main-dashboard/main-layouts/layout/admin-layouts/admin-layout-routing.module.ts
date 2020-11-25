import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';


export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'audio-controll',
    loadChildren: () => import('../../../items/audio/audio.module').then(a => a.AudioModule)
  },
  {
    path: 'video-controll',
    loadChildren: () => import('../../../items/video/video.module').then(v => v.VideoModule)
  }
];
