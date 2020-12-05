import { AllAudiosComponent } from './all-audios/all-audios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'all-audios',
        component: AllAudiosComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AudioRoutingModule { }
