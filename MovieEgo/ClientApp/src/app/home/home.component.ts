import { Component } from '@angular/core';
import { MovieData } from '../interfaces/MovieData';
import { MovieGetterService } from "../services/MovieGetterService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pop_movies: MovieData[] = [];
  top_movies: MovieData[] = [];
  poster_path_string = "https://image.tmdb.org/t/p/original/";

  constructor(private GetterService: MovieGetterService) {
    //GetterService.getMovie().subscribe(result => {
    //  console.log(result);
    //  var temp = result as MovieData;
    //  temp.id = "550"; // we'll need to have ID set here
    //  temp.rating = "4.5"; // we'll need to retreive ratings from our DB
    //  temp.poster_path = this.poster_path_string + temp.poster_path;
    //  this.pop_movies.push(temp);
    //})

    GetterService.getPopularMovies().subscribe(result => {
      console.log("Popular");
      console.log(result);
      var temp = result as MovieData[];
      for (let i = 0; i < 10; i++)
      {
        temp[i].rating = "3";
        temp[i].poster_path = this.poster_path_string + temp[i].poster_path;
        this.pop_movies.push(temp[i]);
      }
    })

    GetterService.getTopMovies().subscribe(result => {
      console.log("Top");
      console.log(result);
      var temp = result as MovieData[];
      for (let i = 0; i < 10; i++) {
        temp[i].rating = "4.5";
        temp[i].poster_path = this.poster_path_string + temp[i].poster_path;
        this.top_movies.push(temp[i]);
      }
    })

  }

}
