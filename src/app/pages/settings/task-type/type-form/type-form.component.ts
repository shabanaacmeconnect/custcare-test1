import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent {
  title='Add New'
  @Input() companyData:any;
  @Output() saved=new EventEmitter<any>();
  form!:FormGroup;
  submitted=false;
  categories=[];
  company={company_name:'',id:''}
  companyId:any
  @ViewChild('closemodal')  companydropdown!: ElementRef<HTMLElement>;

  constructor(private apiService:ApiService,private formBuilder:FormBuilder,private router:Router,private eventService: EventService){

  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      task_type_name: ['', [Validators.required]],
      company_id: ['', ],
      });
      this.getCompanyId()
  }
  getCompanyId(){
   this.company= this.apiService.defaultCompanyValue
        this.companyId=this.company.id
       
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  formsubmitted() {
    this.submitted = true;
   
    if (this.form.invalid) {
      return;
    } else {
      let formdata=new FormData();
      formdata.append('task_type_name',this.f['task_type_name'].value);
      formdata.append('company_id',this.company.id);
      if(this.companyData.details.id){
        formdata.append('id',this.companyData.details.id)
        this.apiService.putMultipart('user/task_types',formdata).subscribe((res)=>{
          if(res.status==true){
                 this.saved.emit()    
                 this.eventService.broadcast('success', {page:'taskType',message:'Selected task type has been updated.'});
                 let el: HTMLElement = this.companydropdown.nativeElement;
                el.click();
          }
          else{
            
          }
        })  
      }else{
        this.apiService.postMultipart('user/task_types',formdata).subscribe((res)=>{
          if(res.status==true){
                 this.saved.emit() 
                 this.eventService.broadcast('success', {page:'taskType',message:'Selected task status has been added.'});
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
    console.log(this.companyData.details.id)
    if(this.companyData.details.id){
      let data=this.companyData.details;
      this.form.patchValue({
        task_type_name:data.task_type_name,
        company_id:data.company_id,
      })
    }else
    this.form.reset()
    this.submitted = false
  }
}
