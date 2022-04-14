import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MovieGetterService {
  constructor(private http: HttpClient) { }

  getMovie() {
    console.log("hit");
    return this.http.get("TMDB");
  }
}
