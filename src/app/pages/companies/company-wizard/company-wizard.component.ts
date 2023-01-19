import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-company-wizard',
  templateUrl: './company-wizard.component.html',
  styleUrls: ['./company-wizard.component.css']
})
export class CompanyWizardComponent {
  step=1;
  title='Add New'
  companyData:any;
  form!:FormGroup;
  submitted=false;
  categories=[]; category_id=''
  @Output() saved=new EventEmitter<any>();

  constructor(private apiService:ApiService,private formBuilder:FormBuilder){

  }
  ngOnInit(){
    this.form = this.formBuilder.group({
      company_name: ['', [Validators.required]],
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
  setCategory(id:any){
    this.category_id=id;
  }
  goBack(){
    if(this.step==2) this.step=1;
  }
  goNext(){
    this.submitted=true
    if(this.step==1){
      if(this.form.value.company_name=='')
        return
        this.step=2;
    }else if(this.step==2){
      if(this.category_id=='') return;
      this.formsubmitted();
    }
  }
  formsubmitted() {
    this.submitted = true;
   
      let formdata=new FormData();
      formdata.append('company_name',this.f['company_name'].value)
      formdata.append('company_category_id',this.category_id)
      if(this.companyData){
        formdata.append('id',this.companyData['id'])
        this.apiService.putMultipart('user/companies',formdata).subscribe((res)=>{
          if(res.status==true){
            this.step=3;
                 this.saved.emit()    
          }
          else{
            
          }
        })  
      }else{
        this.apiService.postMultipart('user/companies',formdata).subscribe((res)=>{
          if(res.status==true){
            this.step=3;
                 this.saved.emit();    
          }
          else{
            
          }
        })  

      }
     
  }
}
