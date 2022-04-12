import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PostDto } from "../interfaces/PostDto";
import { PostService } from "../services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})

export class PostComponent {
  public postForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      content: new FormControl("", [Validators.required]),
      rating: new FormControl("", [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.postForm.controls[controlName].invalid && this.postForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.postForm.controls[controlName].hasError(errorName)
  }

  public createPost = (postFormValue) => {
    this.showError = false;
    const post = { ...postFormValue };
    const postDto: PostDto = {
      Content: post.content,
      Vote: 0,
      Rating: post.rating,
      IdentityUserId: -1,
      MovieId: 1 //add move id here
    }
    this.postService.post(postDto).subscribe(result => {
      //console.log(result)
    },
      (error) => {
        this.errorMessage = error.error;
        this.showError = true;
      });
  }
}
