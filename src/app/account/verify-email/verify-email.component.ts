import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})

/**
 * Login component
 */
export class VerifyEmailComponent implements OnInit, AfterViewInit {

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private activatedRoute:ActivatedRoute, private apiService:ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
   this.activatedRoute.queryParams
   .subscribe(params => {
    if(params['reference']){
      this.apiService.get('auth/confirmation/'+params['reference']).subscribe((res)=>{
      })
    }
   })
  }

  ngAfterViewInit() {
  }
  resent(){
    this.apiService.post('api/resendEmail',{}).subscribe(res=>{
      if(res['status']==true){
        
      }
    })
  }
 
}
