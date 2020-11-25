import { HelperService } from './../../../../shared/services/helper.service';
import { VideoService } from './../../../../services/video/video.service';
import { StartRefresh } from './../../../../interfaces/refresh';
import { Video } from './../../../../interfaces/video';
import { NavService } from '../../../../services/nav.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videos: Video[];
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
              private videoService: VideoService,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.state = 'جارى التحميل...';
    this.showNav.showNavbar.next(false);
    this.showNav.showfooter.next(false);
    this.helperService.showSpinner();
    this.videoService.getAllVideos(this.postsPerPage, this.currentPage)
      .subscribe((dataPage) => {
        this.totalPost = dataPage['maxPosts'];
        this.videoService.videos.next(dataPage['videos']);
        this.videoService.videos.subscribe(data => {
          this.videos = data;
          this.helperService.hideSpinner();
        });
      });
  }

  onChangePage(pageData: PageEvent) {
    this.helperService.showSpinner();
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.videoService.getAllVideos(this.postsPerPage, this.currentPage)
      .subscribe((dataPage) => {
        this.videoService.videos.next(dataPage['videos']);
        this.helperService.hideSpinner();
      });
  }

  refreshContentEdit(videos) {
    this.videos = videos;
  }

  refreshVideos(data: { startRefresh: StartRefresh }) {
    const {startRefresh} = data;
    if (startRefresh.refresh === true || this.startRefresh.refresh === true) {
      this.helperService.showSpinner();
      this.videoService.videos.next(this.videos);
      this.videoService.getAllVideos(this.postsPerPage, this.currentPage)
          .subscribe((dataPage) => {
            this.totalPost = dataPage['maxPosts'];
            this.videoService.videos.next(dataPage['videos']);
            this.videoService.videos.subscribe(data => {
              this.videos = data;
              this.helperService.hideSpinner();
            });
        });
      this.startRefresh.refresh = false;
      startRefresh.refresh = false;
    }
  }

  deleteVideo(videoId: number) {
    this.videoService.deleteVideo(videoId).subscribe(() => {
      for (let i = 0; this.videos.length; i++) {
        if (this.videos[i]._id === videoId) {
          this.videos.splice(i, 1);
          this.videoService.videos.next(this.videos);
          this.videoService.getAllVideos(this.postsPerPage, this.currentPage)
          .subscribe((dataPage) => {
            this.totalPost = dataPage['maxPosts'];
            this.videoService.videos.next(dataPage['videos']);
            this.videoService.videos.subscribe(data => {
              this.videos = data;
            });
          });
          this.helperService.openSnackBar('تم حذف هذا المقطع الصوتي بنجاح', 'OK');
          break;
        }
      }
    }, err => {
      console.log(err);
    });
  }

}
