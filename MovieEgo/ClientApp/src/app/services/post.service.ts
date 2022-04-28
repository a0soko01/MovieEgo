import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PostDto } from "../interfaces/PostDto";

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) { }

  public post(body: PostDto): Observable<any> {
    return this.http.post("user/post", body);
  }

  public getPostsByMovie(id: number): Observable<any> {
    return this.http.post("user/getpost", id);
  }
}
