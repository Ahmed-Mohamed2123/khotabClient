import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './../../pipes/pipes.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioRoutingModule } from './audio-routing.module';
import { AllAudiosComponent } from './all-audios/all-audios.component';


@NgModule({
  declarations: [AllAudiosComponent],
  imports: [
    CommonModule,
    AudioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ]
})
export class AudioModule { }
