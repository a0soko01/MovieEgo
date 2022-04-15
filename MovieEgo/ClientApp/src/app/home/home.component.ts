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
  top_movies: MovieData[] = [
    { id: "0", title: "Texas Chainsaw Massacre", poster_path: "https://m.media-amazon.com/images/M/MV5BMDU4Yzk1NmUtNDU4OC00YzVmLTgwOTUtYTY2NjNmMjY5YjVmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg", rating: "2.0", overview: "lol" },
    { id: "1", title: "Joker", poster_path: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg", rating: "5.0", overview: "lol" },
    { id: "2", title: "Sailor Moon", poster_path: "https://m.media-amazon.com/images/M/MV5BYTkxMmQ5ZjMtNDVhYi00YTNjLWFiZTUtZTgyZjQ3ZWJiNjdmXkEyXkFqcGdeQXVyMTA3MzQ4MTg0._V1_.jpg", rating: "4.5", overview: "lol" },
    { id: "0", title: "Texas Chainsaw Massacre", poster_path: "https://m.media-amazon.com/images/M/MV5BMDU4Yzk1NmUtNDU4OC00YzVmLTgwOTUtYTY2NjNmMjY5YjVmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg", rating: "2.0", overview: "lol" },
    { id: "1", title: "Joker", poster_path: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg", rating: "5.0", overview: "lol" },
    { id: "2", title: "Sailor Moon", poster_path: "https://m.media-amazon.com/images/M/MV5BYTkxMmQ5ZjMtNDVhYi00YTNjLWFiZTUtZTgyZjQ3ZWJiNjdmXkEyXkFqcGdeQXVyMTA3MzQ4MTg0._V1_.jpg", rating: "4.5", overview: "lol" }
  ];
  poster_path_string = "https://image.tmdb.org/t/p/original/";

  constructor(private GetterService: MovieGetterService) {
    GetterService.getMovie().subscribe(result => {
      console.log(result);
      var temp = result as MovieData;
      temp.id = "550"; // we'll need to have ID set here
      temp.rating = "4.5"; // we'll need to retreive ratings from our DB
      temp.poster_path = this.poster_path_string + temp.poster_path;
      this.pop_movies.push(temp);
    })

    GetterService.getPopularMovies().subscribe(result => {
      console.log(result);
    })

  }

}
