import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit,OnChanges{
  title='Add New'
  @Input() companyData:any;
  @Output() saved=new EventEmitter<any>();
  form!:FormGroup;
  submitted=false;
  categories=[];
  
  constructor(private apiService:ApiService,private formBuilder:FormBuilder){

  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      company_email: ['', [Validators.required, Validators.email]],
      company_name: ['', [Validators.required]],
      company_category_id: ['', [Validators.required]],
      });
      this.getCategory();

  }
  getCategory(){
    this.apiService.get('user/company_categories').subscribe((res)=>{
      if(res['status']==true){
        this.categories=res['data'];
      }
    })

  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  formsubmitted() {
    this.submitted = true;
   
    if (this.form.invalid) {
      return;
    } else {
      let formdata=new FormData();
      formdata.append('company_email',this.f['company_email'].value);
      formdata.append('company_name',this.f['company_name'].value)
      formdata.append('company_category_id',this.f['company_category_id'].value)
      if(this.companyData.details.id){
        formdata.append('id',this.companyData.details.id)
        this.apiService.putMultipart('user/companies',formdata).subscribe((res)=>{
          if(res.status==true){
                 this.saved.emit()    
          }
          else{
            
          }
        })  
      }else{
        this.apiService.postMultipart('user/companies',formdata).subscribe((res)=>{
          if(res.status==true){
                 this.saved.emit()    
          }
          else{
            
          }
        })  

      }
     
       
    }
  }
  
  ngOnChanges(){
    console.log(this.companyData.details)
    if(this.companyData.details.id){
      let data=this.companyData.details;
      this.form.patchValue({
        company_name:data.company_name,
        company_email:data.company_email,
        company_category_id:data.company_category_id

      })
    }
  }
}
