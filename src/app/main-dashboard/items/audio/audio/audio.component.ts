import { HelperService } from './../../../../shared/services/helper.service';
import { StartRefresh } from './../../../../interfaces/refresh';
import { Audio } from 'src/app/interfaces/audio';
import { AudioService } from '../../../../services/audio/audio.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  audios: Audio[];
  startRefresh: StartRefresh = new StartRefresh();
  searchTerm: string;
  // spinner
  state = '';

  // pagination
  totalPost;
  postsPerPage = 12;
  currentPage = 1;
  pageSizeOption = [1, 2, 5, 10, 12, 15];

  constructor(private showNav: NavService,
              private audioService: AudioService,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.state = 'جارى التحميل...';
    this.showNav.showNavbar.next(false);
    this.showNav.showfooter.next(false);
    this.helperService.showSpinner();
    this.audioService.getAllAudios(this.postsPerPage, this.currentPage)
      .subscribe((dataPage) => {
        this.totalPost = dataPage['maxPosts'];
        this.audioService.audios.next(dataPage['audios']);
        this.audioService.audios.subscribe(data => {
          this.audios = data;
          this.helperService.hideSpinner();
        });
      });
  }

  onChangePage(pageData: PageEvent) {
    this.helperService.showSpinner();
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.audioService.getAllAudios(this.postsPerPage, this.currentPage)
      .subscribe((dataPage) => {
        this.audioService.audios.next(dataPage['audios']);
        this.helperService.hideSpinner();
      });
  }

  refreshContentEdit(audios) {
    this.audios = audios;
  }

  refreshAudios(data: { startRefresh: StartRefresh }) {
    const {startRefresh} = data;
    if (startRefresh.refresh === true || this.startRefresh.refresh === true) {
      this.helperService.showSpinner();
      this.audioService.audios.next(this.audios);
      this.audioService.getAllAudios(this.postsPerPage, this.currentPage)
          .subscribe((dataPage) => {
            this.totalPost = dataPage['maxPosts'];
            this.audioService.audios.next(dataPage['audios']);
            this.audioService.audios.subscribe(data => {
              this.audios = data;
              this.helperService.hideSpinner();
            });
        });
      this.startRefresh.refresh = false;
      startRefresh.refresh = false;
    }
  }

  deleteAudio(audioId: number) {
    this.audioService.deleteAudio(audioId).subscribe(() => {
      for (let i = 0; this.audios.length; i++) {
        if (this.audios[i]._id === audioId) {
          this.audios.splice(i, 1);
          this.audioService.audios.next(this.audios);
          this.audioService.getAllAudios(this.postsPerPage, this.currentPage)
          .subscribe((dataPage) => {
            this.totalPost = dataPage['maxPosts'];
            this.audioService.audios.next(dataPage['audios']);
            this.audioService.audios.subscribe(data => {
              this.audios = data;
            });
          });
          this.helperService.openSnackBar('تم حذف هذا الفيديو بنجاح', 'OK');
          break;
        }
      }
    }, err => {
      console.log(err);
    });
  }

}
