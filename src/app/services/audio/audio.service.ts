import { ApiEndpoints } from './../../shared/end-points';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Audio } from 'src/app/interfaces/audio';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public audios: BehaviorSubject<Audio[]> = new BehaviorSubject<Audio[]>(null);

  constructor(private http: HttpClient) {
  }

  getAllAudios(postsPerPage: number, current: number): Observable<Audio[]> {
    try {
      const queryParams = `?pagesize=${postsPerPage}&page=${current}`;
      return this.http.get<Audio[]>(ApiEndpoints.AudioEndPoints.getAllAudio + queryParams);
    } catch (error) {
      console.error(error);
    }
  }

  getById(id: number): Observable<Audio> {
    try {
      return this.http.get<Audio>(`${ApiEndpoints.AudioEndPoints.getAudioById}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  newAudio(audioInfoAdd: any): Observable<Audio> {
    try {
      return this.http.post<Audio>(ApiEndpoints.AudioEndPoints.addAudio, audioInfoAdd);
    } catch (error) {
      console.error(error);
    }
  }

  // updateAudio(id: number, data: FormData): Observable<Audio> {
  //   try {
  //     return this.http.put<Audio>(`${ApiEndpoints.AudioEndPoints.updateAudio}/${id}`, data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  editAudio(id: number, data: FormData): Observable<Audio> {
    try {
      return this.http.put<Audio>(`${ApiEndpoints.AudioEndPoints.updateAudio}/${id}`, data);
    } catch (error) {
      console.error(error);
    }
  }

  deleteAudio(id: number): Observable<any> {
    try {
      return this.http.delete<any>(`${ApiEndpoints.AudioEndPoints.deleteAudio}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
}
