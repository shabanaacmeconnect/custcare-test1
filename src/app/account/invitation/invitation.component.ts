import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
})

/**
 * Login component
 */
export class InvitationComponent implements OnInit, AfterViewInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  reference=''
  // tslint:disable-next-line: max-line-length
  constructor(private activatedRoute:ActivatedRoute, private apiService:ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
   this.activatedRoute.queryParams
   .subscribe(params => {
    if(params['reference']){
    this.reference=params['reference']
    }
   })
  }

  accept(type:any){
    // this.apiService.get('auth/accept-invitation/'+params['reference']).subscribe((res)=>{
    // })
  }
  ngAfterViewInit() {
  }

 
}
