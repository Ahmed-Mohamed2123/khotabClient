import { HelperService } from './../../services/helper.service';
import { VideoService } from './../../../services/video/video.service';
import { NavService } from './../../../services/nav.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { StartRefresh } from './../../../interfaces/refresh';
import { Video } from './../../../interfaces/video';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {

  @Input() audioInfo: Video[];
  @Input() startRefresh: StartRefresh;
  // tslint:disable-next-line: no-output-native
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  uploaderImage: FileUploader = new FileUploader({
    maxFileSize: 10 * 1024 * 1024 // 10 MB
  });
  uploaderVideo: FileUploader = new FileUploader({
    maxFileSize: 10 * 1024 * 1024 // 10 MB
  });
  selectedImgVideo: string;
  selectedVideo: string;
  viewProgressBar = false;

  // FormGroup
  videoDto: FormGroup;
  formData: FormData = new FormData();

  constructor(private showNav: NavService,
              private fb: FormBuilder,
              private videoService: VideoService,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.showNav.showNavbar.next(false);

    this.videoDto = this.fb.group({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      image: new FormControl(null),
      video: new FormControl(null, Validators.required)
    });
  }

  createNewVideo() {
    this.formData.append('title', this.videoDto.value.title);
    this.formData.append('description', this.videoDto.value.description);
    this.viewProgressBar = true;
    this.videoService.newVideo(this.formData)
    .subscribe((res) => {
        this.startRefresh.refresh = true;
        this.startRefresh.data = res;
        const data = { startRefresh: this.startRefresh, data: res };
        this.change.emit(data);
        this.viewProgressBar = false;
        this.helperService.hideDialog();
        this.helperService.openSnackBar('تم رفع الفيديو بنجاح', 'ok');
        this.deleteFormContent();
      }, err => {
        this.viewProgressBar = false;
        this.helperService.hideDialog();
        this.helperService.openSnackBar('حدث خطأ', 'الغاء');
        this.deleteFormContent();
        console.error(err);
      });
  }

  onImgVideoSourceSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedImgVideo = file.name;
      this.formData.append('image', file);
    }
  }

  onVideoSourceSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedVideo = file.name;
      this.formData.append('video', file);
    }
  }

  deleteFormContent() {
    this.videoDto.reset();
    this.selectedImgVideo = null;
    this.selectedVideo = null;
    this.formData.delete('title');
    this.formData.delete('description');
    this.formData.delete('image');
    this.formData.delete('video');
  }

}
