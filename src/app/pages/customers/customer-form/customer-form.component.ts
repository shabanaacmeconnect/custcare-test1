import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  title='Add New'
  @Input() projectData:any;
  @Output() saved=new EventEmitter<any>();
  form!:FormGroup;
  submitted=false;
  clients=[];
  projectTypes=[];
  projectStatus=[];
  company={company_name:'',id:''}
  companyId:any
  @ViewChild('closemodal')  companydropdown!: ElementRef<HTMLElement>;
  constructor(private apiService:ApiService,private formBuilder:FormBuilder,private router:Router,private eventService:EventService){

  }
  ngOnInit() {
    this.company=this.apiService.defaultCompanyValue
    this.companyId=this.company.id;
      this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],      
      company_id: this.companyId,
      email:['',[Validators.required,Validators.email]],
      });
      

  }
 
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  formsubmitted() {
    this.submitted = true;
   
    if (this.form.invalid) {
      return;
    } else {
      let formdata=new FormData();
      formdata.append('first_name',this.f['first_name'].value);
      formdata.append('last_name',this.f['last_name'].value);
      formdata.append('email',this.f['email'].value);
      formdata.append('company_id',this.company.id);
      if(this.projectData.details.id){
        formdata.append('id',this.projectData.details.id)
        this.apiService.putMultipart('user/company_requests/client',formdata).subscribe((res)=>{
          if(res.status==true){
                this.saved.emit()    
                this.eventService.broadcast('success', {page:'customerForm',message:'Invitation email has been sent to "user email"'});

          }
          else{

          }
        })  
      }else{
        this.apiService.postMultipart('user/company_requests/client',formdata).subscribe((res)=>{
          if(res.status==true){
                this.saved.emit()  
                this.eventService.broadcast('success', {page:'customerForm',message:'Invitation email has been sent to '+this.f['email'].value});
                let el: HTMLElement = this.companydropdown.nativeElement;
                el.click();
          }
          else{
            
          }
        })  

      }
     
       
    }
  }
  
  ngOnChanges(){
    if(this.projectData.details.id){
      let data=this.projectData.details;
      this.form.patchValue({
        first_name:data.first_name,
        last_name:data.last_name,
        email:data.email,
        company_id:data.company_id,
      })
    }else
    {this.form.reset()
    this.submitted = false}
  }
 
}
