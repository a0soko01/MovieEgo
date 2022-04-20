import { query } from "@angular/animations";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MovieData } from "../interfaces/MovieData";

@Injectable({ providedIn: 'root' })
export class MovieGetterService {
  constructor(private http: HttpClient) { }

  getMovie(id: number) {
    let queryParams = new HttpParams();
    queryParams.append("id", ""+id);
    return this.http.get("TMDB", { params: queryParams });
  }

  getPopularMovies() {
    return this.http.get("TMDB/Popular");
  }

  getTopMovies() {
    return this.http.get("TMDB/Top");
  }
}
