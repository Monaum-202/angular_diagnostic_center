import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public getToken(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const userToken = JSON.parse(user)
      return userToken.jwtToken;
    }

    return {};
  }
  
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const userData = JSON.parse(user);
      console.log("Saiful ------",JSON.parse(user))
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(userData.jwtToken);
      console.log("decodedToken -------",decodedToken)
// Other functions
      const expirationDate = helper.getTokenExpirationDate(userData.jwtToken);
      console.log("expirationDate --",expirationDate)
      const isExpired = helper.isTokenExpired(userData.jwtToken);
      console.log("isExpired --",isExpired)

      return decodedToken;
    }
    return {};
  }

  getUserRole(): string | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (!user) return null;

      const userData = JSON.parse(user);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(userData.jwtToken);
      return decodedToken.roles ? decodedToken.roles[0] : null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem( 'auth-user');
    if (user) {
      return true;
    }
    return false;
  }


  
}
