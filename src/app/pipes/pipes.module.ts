import { VideoFilterPipe } from './video-filter.pipe';
import { AudioFilterPipe } from './audio-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AudioFilterPipe, VideoFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    AudioFilterPipe,
    VideoFilterPipe
  ]
})
export class PipesModule { }
