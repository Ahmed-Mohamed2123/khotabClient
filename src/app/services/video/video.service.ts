import { ApiEndpoints } from './../../shared/end-points';
import { Observable, BehaviorSubject } from 'rxjs';
import { Video } from './../../interfaces/video';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public videos: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>(null);

  constructor(private http: HttpClient) { }

  getAllVideos(postsPerPage: number, current: number): Observable<Video[]> {
    try {
      const queryParams = `?pagesize=${postsPerPage}&page=${current}`;
      return this.http.get<Video[]>(ApiEndpoints.VideoEndPoints.getAllVideos + queryParams);
    } catch (error) {
      console.error(error);
    }
  }

  getById(id: number): Observable<Video> {
    try {
      return this.http.get<Video>(`${ApiEndpoints.VideoEndPoints.getVideoById}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  newVideo(videoInfoAdd: any): Observable<Video> {
    try {
      return this.http.post<Video>(ApiEndpoints.VideoEndPoints.addVideo, videoInfoAdd);
    } catch (error) {
      console.error(error);
    }
  }

  editVideo(id: number, data: FormData): Observable<Video> {
    try {
      return this.http.put<Video>(`${ApiEndpoints.VideoEndPoints.updateVideo}/${id}`, data);
    } catch (error) {
      console.error(error);
    }
  }

  deleteVideo(id: number): Observable<any> {
    try {
      return this.http.delete<any>(`${ApiEndpoints.VideoEndPoints.deleteVideo}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
}
