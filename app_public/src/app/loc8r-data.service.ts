import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Location } from './home-list/home-list.component';
import { Location, Review } from './location';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';


@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {
  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) { }

  //private apiBaseUrl = 'http://localhost:3000/api';
  private apiBaseUrl = 'https://loc8rvsrl.herokuapp.com/api';

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    //const lng: number = 126.839832;
    //const lat: number = 37.661241;
    const maxDistance: number = 20000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError);
  }
  public getLocationById(locationId: any): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http
    .get(url)
    .toPromise()
    .then(response => response as Location[])
    .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
  const url: string = `${this.apiBaseUrl}/${urlPath}`;
  return this.http
    .post(url, user)
    .toPromise()
    .then(response => response as AuthResponse)
    .catch(this.handleError);
}

  public addReviewByLocationId(locationId: string, formData: Review): 
  Promise<Review> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Autorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
}


