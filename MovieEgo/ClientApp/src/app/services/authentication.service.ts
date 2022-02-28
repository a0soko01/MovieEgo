import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject } from "rxjs";
import { isNullOrUndefined } from "util";
import { UserForAuthenticationDto } from "../interfaces/UserForAuthenticationDto";
import { UserForRegistrationDto } from "../interfaces/UserForRegistrationDto";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  constructor(private http: HttpClient, private _jwtHelper: JwtHelperService) { }

  public loginUser(body: UserForAuthenticationDto): Observable<any> {
    return this.http.post("user/login", body);
  }

  public registerUser(body: UserForRegistrationDto): Observable<any> {
    return this.http.post("user/register", body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return token && !this._jwtHelper.isTokenExpired(token);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public getEmail(): string {
    const token = localStorage.getItem("token");
    if (isNullOrUndefined(token)) {
      return;
    }
    const decodedToken = this._jwtHelper.decodeToken(token);
    return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  }

}
