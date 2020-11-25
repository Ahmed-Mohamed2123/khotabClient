import { HelperService } from './../../../shared/services/helper.service';
import { NavService } from './../../../services/nav.service';
import { VideoService } from './../../../services/video/video.service';
import { Video } from './../../../interfaces/video';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {

  videos: Video[];
  searchTerm: string;
  // spinner
  state = '';

  // pagination
  totalPost;
  postsPerPage = 12;
  currentPage = 1;
  pageSizeOption = [1, 2, 5, 10, 12, 15];

  constructor(private videoService: VideoService,
              private navShow: NavService,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.state = 'جارى التحميل...';
    this.navShow.showNavbar.next(true);
    this.navShow.showfooter.next(false);
    this.helperService.showSpinner();
    this.videoService.getAllVideos(this.postsPerPage, this.currentPage)
      .subscribe((dataPage: any) => {
        this.totalPost = dataPage['maxPosts'];
        if (this.totalPost < 22) {
          this.navShow.showfooter.next(false);
        } else {
          this.navShow.showfooter.next(true);
        }
        this.videoService.videos.next(dataPage['videos']);
        this.videoService.videos.subscribe(data => {
          this.videos = data;
          this.helperService.hideSpinner();
        });
      });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.helperService.showSpinner();
    this.videoService.getAllVideos(this.postsPerPage, this.currentPage)
      .subscribe((dataPage) => {
        this.videoService.videos.next(dataPage['videos']);
        this.helperService.hideSpinner();
      });
  }

}
