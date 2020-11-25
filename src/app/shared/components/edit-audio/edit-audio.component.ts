import { HelperService } from './../../services/helper.service';
import { Audio } from 'src/app/interfaces/audio';
import { FileUploader } from 'ng2-file-upload';
import { AudioService } from 'src/app/services/audio/audio.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-audio',
  templateUrl: './edit-audio.component.html',
  styleUrls: ['./edit-audio.component.scss']
})
export class EditAudioComponent implements OnInit {

  @Input() audio: Audio;
  @Input() audios: Audio[];
  // tslint:disable-next-line: no-output-native
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  uploader: FileUploader = new FileUploader({
    maxFileSize: 10 * 1024 * 1024 // 10 MB
  });
  selectedAudio: string;
  viewProgressBar = false;
  updateAudioDto: FormGroup;
  formData: FormData = new FormData();

  constructor(private audioService: AudioService,
              private fb: FormBuilder,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.updateAudioDto = this.fb.group({
      title: new FormControl(this.audio.title),
      description: new FormControl(this.audio.description),
      audio: new FormControl(null)
    });
  }

  deleteFormsContent(): void {
    this.updateAudioDto.reset();
    this.selectedAudio = null;
    this.formData.delete('title');
    this.formData.delete('description');
    this.formData.delete('audio');
  }

  onSourceSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedAudio = file.name;
      this.formData.append("audio", file);
    }
  }

  editAudio() {
    this.formData.append('title', this.updateAudioDto.value.title);
    this.formData.append('description', this.updateAudioDto.value.description);
    this.audioService.editAudio(this.audio._id, this.formData)
      .subscribe((updatedAudio: Audio) => {
        for (let i = 0; i < this.audios.length; i++) {
          if (this.audios[i]._id === this.audio._id) {
            this.audios[i] = updatedAudio['result'];
            this.change.emit(this.audios);
            break;
          }
        }
        this.viewProgressBar = false;
        this.helperService.hideDialog();
        this.helperService.openSnackBar('تم تحديث المقطع الصوتى بنجاح', 'OK');
        this.deleteFormsContent();
      }, error => {
        this.viewProgressBar = false;
        this.helperService.hideDialog();
        this.helperService.openSnackBar('An error has occurred', 'Cancel');
        console.error(error);
        this.deleteFormsContent();
      });
  }

}
