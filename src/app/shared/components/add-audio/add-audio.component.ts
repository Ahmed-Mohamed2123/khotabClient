import { HelperService } from './../../services/helper.service';
import { StartRefresh } from './../../../interfaces/refresh';
import { Audio } from 'src/app/interfaces/audio';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { AudioService } from 'src/app/services/audio/audio.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-add-audio',
  templateUrl: './add-audio.component.html',
  styleUrls: ['./add-audio.component.scss']
})
export class AddAudioComponent implements OnInit {
  @Input() audioInfo: Audio[];
  @Input() startRefresh: StartRefresh;
  // tslint:disable-next-line: no-output-native
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  uploader: FileUploader = new FileUploader({
    maxFileSize: 10 * 1024 * 1024 // 10 MB
  });
  selectedAudio: string;
  viewProgressBar = false;

  // FormGroup
  audioDto: FormGroup;
  formData: FormData = new FormData();

  constructor(private showNav: NavService,
              private fb: FormBuilder,
              private audioService: AudioService,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.showNav.showNavbar.next(false);

    this.audioDto = this.fb.group({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      audio: new FormControl(null, Validators.required)
    });
  }

  createNewAudio() {
    this.formData.append('title', this.audioDto.value.title);
    this.formData.append('description', this.audioDto.value.description);
    this.viewProgressBar = true;
    this.audioService.newAudio(this.formData)
    .subscribe((res) => {
        this.startRefresh.refresh = true;
        this.startRefresh.data = res;
        const data = { startRefresh: this.startRefresh, data: res };
        this.change.emit(data);
        this.viewProgressBar = false;
        this.helperService.hideDialog();
        this.helperService.openSnackBar('تم رفع المقطع الصوتى بنجاح', 'ok');
        this.deleteFormContent();
      }, err => {
        this.viewProgressBar = false;
        this.helperService.hideDialog();
        this.helperService.openSnackBar('حدث خطأ', 'الغاء');
        this.deleteFormContent();
        console.error(err);
      });
  }

  onAudioSourceSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedAudio = file.name;
      this.formData.append('audio', file);
    }
  }

  deleteFormContent() {
    this.audioDto.reset();
    this.selectedAudio = null;
    this.formData.delete('title');
    this.formData.delete('description');
    this.formData.delete('audio');
  }

}
