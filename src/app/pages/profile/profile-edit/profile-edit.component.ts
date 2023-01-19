import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  form!:FormGroup;
  submitted=false;
  company={company_name:'',id:''}
  companyId:any
  timeZone:any=[]
  constructor(private apiService:ApiService,private formBuilder:FormBuilder,private router:Router,private eventService:EventService){

  }
  ngOnInit() {
    this.company=this.apiService.defaultCompanyValue
    this.companyId=this.company.id;
      this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      company_id: this.companyId,
      timezone_id:['',],
      });
      
  this.getDropdown()
  this.getDetails()
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  getDropdown(){

    this.apiService.get('/app/timezones').subscribe((res)=>{
      if(res['status']==true){
        this.timeZone=res['data'];
      }
    })
  }
  getDetails() {
    this.apiService.get('user/userProfile?company_id=' +this.companyId).subscribe(
      res => {
        if(res['status']==true){
          {
            let item =res['data'];
            this.form.patchValue({
              first_name:item.first_name,
              last_name:item.last_name,
              timezone_id:parseInt(item.timezone_id),
            });
          }
        
      }
    })
   
  }
  formsubmitted() {
    this.submitted = true;
   
    if (this.form.invalid) {
      return;
    } else {
      let formdata=new FormData();
      formdata.append('first_name',this.f['first_name'].value);
      formdata.append('last_name',this.f['last_name'].value);
      formdata.append('timezone_id',this.f['timezone_id'].value);
      formdata.append('company_id',this.company.id);
      this.apiService.putMultipart('user/userProfile',formdata).subscribe((res)=>{
        if(res.status==true){
              // this.saved.emit()    
              // this.eventService.broadcast('success', {page:'customerForm',message:'Profile  has been updated'});

        }
        else{

        }
      })
       
    }
  }
  
}
