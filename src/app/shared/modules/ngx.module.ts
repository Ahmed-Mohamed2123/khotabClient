import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxAudioPlayerModule,
    NgxSpinnerModule
  ],
  exports: [
    NgxAudioPlayerModule,
    NgxSpinnerModule
  ]
})
export class NgxModule { }
