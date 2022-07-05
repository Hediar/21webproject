import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  public getPosition(cbSucceess:any, cbError:any, cbNoGeo:any): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSucceess, cbError);
    } else {
      cbNoGeo();
    }
  }
}
