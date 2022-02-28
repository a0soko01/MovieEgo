import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  user = '';
  constructor(private _authService: AuthenticationService) {
    this._authService.authChanged
      .subscribe(res => {
        this.user = this._authService.getEmail();
      })
  }

  ngOnInit(): void {
    if (this._authService.isUserAuthenticated())
      this._authService.sendAuthStateChangeNotification(true);
      this.user = this._authService.getEmail();
  }
}
