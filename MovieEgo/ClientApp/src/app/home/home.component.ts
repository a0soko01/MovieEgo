import { Component } from '@angular/core';
import { MovieGetterService } from "../services/MovieGetterService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private GetterService: MovieGetterService) {
    GetterService.getMovie().subscribe(result => {
      console.log(result);
    })
  }
}
