import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public showNavbar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showfooter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor() { }
}
