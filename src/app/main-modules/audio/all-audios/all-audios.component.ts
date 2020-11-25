import { HelperService } from './../../../shared/services/helper.service';
import { NavService } from './../../../services/nav.service';
import { Audio } from './../../../interfaces/audio';
import { AudioService } from 'src/app/services/audio/audio.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-audios',
  templateUrl: './all-audios.component.html',
  styleUrls: ['./all-audios.component.scss']
})
export class AllAudiosComponent implements OnInit {

  audios: Audio[];
  searchTerm: string;
  // spinner
  state = '';

  // pagination
  totalPost;
  postsPerPage = 12;
  currentPage = 1;
  pageSizeOption = [1, 2, 5, 10, 12, 15];

  constructor(private audioService: AudioService,
              private navShow: NavService,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.state = 'جارى التحميل...';
    this.navShow.showNavbar.next(true);
    this.navShow.showfooter.next(false);
    this.helperService.showSpinner();
    this.audioService.getAllAudios(this.postsPerPage, this.currentPage)
      .subscribe((dataPage: any) => {
        this.totalPost = dataPage['maxPosts'];
        if (this.totalPost < 22) {
          this.navShow.showfooter.next(false);
        } else {
          this.navShow.showfooter.next(true);
        }
        this.audioService.audios.next(dataPage['audios']);
        this.audioService.audios.subscribe(data => {
          this.audios = data;
          this.helperService.hideSpinner();
        });
      });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.helperService.showSpinner();
    this.audioService.getAllAudios(this.postsPerPage, this.currentPage)
      .subscribe((dataPage) => {
        this.audioService.audios.next(dataPage['audios']);
        this.helperService.hideSpinner();
      });
  }

}
