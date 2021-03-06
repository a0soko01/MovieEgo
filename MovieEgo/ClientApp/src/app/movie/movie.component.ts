import { Component } from '@angular/core';
import { MovieGetterService } from '../services/MovieGetterService';
import { ActivatedRoute } from '@angular/router';
import { MovieData } from '../interfaces/MovieData';
import { PostService } from '../services/post.service';
import { PostDto } from '../interfaces/PostDto';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  id: number;
  movie = {} as MovieData;
  poster_path_string = "https://image.tmdb.org/t/p/original/";
  posts: PostDto[];

  constructor(private getterService: MovieGetterService, private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.movie.id = this.id;
    });


    getterService.getMovie(this.id).subscribe(result => {
      console.log(result);
      var temp = result as MovieData;
      this.movie.poster_path = this.poster_path_string + temp.poster_path;
      this.movie.overview = temp.overview;
      this.movie.title = temp.title;
      this.movie.rating = "5";
      // var temp = result as MovieData;
      //temp.rating = "4.5"; // we'll need to retreive ratings from our DB
      // temp.poster_path = this.poster_path_string + temp.poster_path;
    })

    postService.getPostsByMovie(this.id).subscribe(result => {
      console.log(result);
      this.posts = result as PostDto[];
      console.log(this.posts);
    })
  }


}
