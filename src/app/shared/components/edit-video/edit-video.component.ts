import { HelperService } from './../../services/helper.service';
import { VideoService } from './../../../services/video/video.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Video } from './../../../interfaces/video';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  @Input() video: Video;
  @Input() videos: Video[];
  // tslint:disable-next-line: no-output-native
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  uploaderImage: FileUploader = new FileUploader({
    maxFileSize: 10 * 1024 * 1024 // 10 MB
  });
  uploaderVideo: FileUploader = new FileUploader({
    maxFileSize: 10 * 1024 * 1024 // 10 MB
  });
  selectedImgVideo: string;
  selectedVideo: string;
  viewProgressBar = false;
  updateVideoDto: FormGroup;
  formData: FormData = new FormData();

  constructor(private videoService: VideoService,
              private fb: FormBuilder,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.updateVideoDto = this.fb.group({
      title: new FormControl(this.video.title),
      description: new FormControl(this.video.description),
      image: new FormControl(null),
      video: new FormControl(null)
    });
  }

  deleteFormsContent(): void {
    this.updateVideoDto.reset();
    this.selectedImgVideo = null;
    this.selectedVideo = null;
    this.formData.delete('title');
    this.formData.delete('description');
    this.formData.delete('image');
    this.formData.delete('video');
  }

  onSourceImgVideoSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedImgVideo = file.name;
      this.formData.append('image', file);
    }
  }

  onSourceVideoSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedVideo = file.name;
      this.formData.append('video', file);
    }
  }

  editVideo() {
    this.formData.append('title', this.updateVideoDto.value.title);
    this.formData.append('description', this.updateVideoDto.value.description);
    this.videoService.editVideo(this.video._id, this.formData)
      .subscribe((updatedAudio: Video) => {
        for (let i = 0; i < this.videos.length; i++) {
          if (this.videos[i]._id === this.video._id) {
            this.videos[i] = updatedAudio['result'];
            this.change.emit(this.videos);
            break;
          }
        }
        this.viewProgressBar = false;
        this.helperService.hideDialog();
        this.helperService.openSnackBar('تم تحديث الفيديو بنجاح', "OK");
        this.deleteFormsContent();
      }, error => {
        this.viewProgressBar = false;
        this.helperService.hideDialog();
        this.helperService.openSnackBar('An error has occurred', "Cancel");
        console.error(error);
        this.deleteFormsContent();
      });
  }

}
