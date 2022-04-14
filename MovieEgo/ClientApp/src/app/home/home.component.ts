import { Component } from '@angular/core';
import { MovieData } from '../interfaces/MovieData';
import { MovieGetterService } from "../services/MovieGetterService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // we'll make calls to api using https://imdb-api.com/en/API/MostPopularMovies/k_zot9l3ar
  // for top 250 movies for the trending movies list
  movies: MovieData[] = [
    { id: "0", title: "Texas Chainsaw Massacre", fullTitle: "Texas Chainsaw Massacre, fulltitle", year: "2022", image: "https://m.media-amazon.com/images/M/MV5BMDU4Yzk1NmUtNDU4OC00YzVmLTgwOTUtYTY2NjNmMjY5YjVmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg", rating: "2.0" },
    { id: "1", title: "Joker", fullTitle: "Joker fulltitle, fulltitle", year: "2019", image: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg", rating: "5.0" },
    { id: "2", title: "Sailor Moon", fullTitle: "Sailor Moon Apollo", year: "2020", image: "https://m.media-amazon.com/images/M/MV5BYTkxMmQ5ZjMtNDVhYi00YTNjLWFiZTUtZTgyZjQ3ZWJiNjdmXkEyXkFqcGdeQXVyMTA3MzQ4MTg0._V1_.jpg", rating: "4.5" },
    { id: "0", title: "Texas Chainsaw Massacre", fullTitle: "Texas Chainsaw Massacre, fulltitle", year: "2022", image: "https://m.media-amazon.com/images/M/MV5BMDU4Yzk1NmUtNDU4OC00YzVmLTgwOTUtYTY2NjNmMjY5YjVmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg", rating: "2.0" },
    { id: "1", title: "Joker", fullTitle: "Joker fulltitle, fulltitle", year: "2019", image: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg", rating: "5.0" },
    { id: "2", title: "Sailor Moon", fullTitle: "Sailor Moon Apollo", year: "2020", image: "https://m.media-amazon.com/images/M/MV5BYTkxMmQ5ZjMtNDVhYi00YTNjLWFiZTUtZTgyZjQ3ZWJiNjdmXkEyXkFqcGdeQXVyMTA3MzQ4MTg0._V1_.jpg", rating: "4.5" }
  ];
  constructor(private GetterService: MovieGetterService) {
    GetterService.getMovie().subscribe(result => {
      console.log(result);
    })
  }
}
