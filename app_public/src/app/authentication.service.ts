import { Inject,Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { Loc8rDataService } from './loc8r-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private loc8rDataService: Loc8rDataService
  ) { }

  public getToken(): any {
    return this.storage.getItem('loc8r-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('loc8r-token', token);
  }

  public login(user: User): Promise<any> {
    return this.loc8rDataService.login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public register(user: User): Promise<any> {
    return this.loc8rDataService.register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem('loc8r-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // console.log("payload: ", payload)
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): any {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      // console.log("token: " + token);
      // console.log("token[1]: " + token.split('.')[1]);
      // console.log("atob(token[1]): " + atob(token.split('.')[1]));
      // console.log(JSON.parse(atob(token.split('.')[1])));
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      // console.log("email: " + email + ", name: " + name)
      return { email, name } as User;
    }
  }
  
}
