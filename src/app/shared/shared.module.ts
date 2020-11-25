import { NgxModule } from './modules/ngx.module';
import { FileModule } from './modules/file.module';
import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidCredentialComponent } from './components/invalid-credential/invalid-credential.component';
import { AddAudioComponent } from './components/add-audio/add-audio.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAudioComponent } from './components/edit-audio/edit-audio.component';
import { EditVideoComponent } from './components/edit-video/edit-video.component';



@NgModule({
  declarations: [InvalidCredentialComponent, AddAudioComponent, AddVideoComponent, EditAudioComponent, EditVideoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FileModule,
    NgxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    FileModule,
    NgxModule,
    AddAudioComponent,
    AddVideoComponent,
    EditAudioComponent,
    EditVideoComponent
  ]
})
export class SharedModule { }
