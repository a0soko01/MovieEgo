import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserForAuthenticationDto } from "../interfaces/UserForAuthenticationDto";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  public loginUser(route: string, body: UserForAuthenticationDto): Observable<any> {
    return this.http.post("login", body);
  }

}
