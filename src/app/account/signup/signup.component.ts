import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  loginForm!: FormGroup;
  submitted = false;
  message: {type:number,message:string}={type:0,message:''};

  // set the currenr year
  year: number = new Date().getFullYear();
  reference='';
  // tslint:disable-next-line: max-line-length
  constructor(private activatedRoute:ActivatedRoute ,private apiService:ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams
   .subscribe(params => {
    if(params['reference']){
    this.reference=params['reference']
    }
   })
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      // user_type:['',Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirm_password'),
    });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
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
    console.log(this.loginForm)
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      let formdata=new FormData();
      formdata.append('email',this.f['email'].value);
      formdata.append('password',this.f['password'].value)
      // formdata.append('user_type',this.f['user_type'].value)
        if(this.reference==''){
          this.apiService.postMultipart('auth/signup',formdata).subscribe((res)=>{
            if(res.status==true){
              this.message={type:1,message:res.message}
                this.router.navigate(['/account/verify-account']);               
            }
            else
            this.message={type:2,message:res.message}
          }) 
        }else{
          
        }
         
    }
  }
}
