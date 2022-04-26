import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserForRegistrationDto } from "../interfaces/UserForRegistrationDto";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;

  public regConfirm: boolean;

  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public loginUser = (loginFormValue) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForReg: UserForRegistrationDto = {
      username: login.username,
      email: login.email,
      passwordHash: login.password
    }

    this._authService.registerUser(userForReg)
      .subscribe(res => {
        console.log(res.value);
        //this._router.navigate([this._returnUrl]);
        this.regConfirm = true; //this has the "register confirmed!" message show
      },
        (error) => {
          console.log(error);
          this.errorMessage = error.error;
          this.showError = true;
        })
  }
}
