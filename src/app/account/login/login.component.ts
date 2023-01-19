import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm!: FormGroup;
  submitted = false;
  error = '';

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private apiService:ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      // let formdata=new FormData();
      // formdata.append('email',this.f.email.value);
      // formdata.append('password',this.f.password.value)

        this.apiService.login(this.loginForm.value).subscribe((res)=>{
          if(res.status==true){
            if(res['userInfo']['email_verified']==1)
              this.router.navigate(['/dashboard']); 
              else this.router.navigate(['/account/verify-account'])              
          }
          else
          this.error = res.message;
        })
          //     if(data.status==true){
          //         this.router.navigate(['/dashboard']);               
          //     }
          //     else
          //     this.error = data.message;
          //  });

        // .pipe(first()).subscribe(
        //   data => {
        //       if(data.status==true){
        //         // if(this.apiService.currentUserValue['role']==1){
        //           this.router.navigate(['/dashboard']);
        //         // }else{
        //         //   this.error ="Sorry! You have no access"
        //         // }
               
        //       }
        //       else
        //       this.error = data.message;
        //     },
        //     error => {
              
        //     });
    }
  }
}
