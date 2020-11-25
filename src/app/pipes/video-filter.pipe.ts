import { Video } from './../interfaces/video';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videosFilter'
})
export class VideoFilterPipe implements PipeTransform {
  transform(videos: Video[], searchTerm: string): Video[] {
    if (!videos || !searchTerm) {
      return videos;
    }
    return videos.filter(video =>
      video.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
