import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent {
  title='Add New'
  @Input() companyData:any;
  @Output() saved=new EventEmitter<any>();
  form!:FormGroup;
  submitted=false;
  categories=[];
  company={company_name:'',id:''}
  companyId:any  
  @ViewChild('closemodal')  companydropdown!: ElementRef<HTMLElement>;

  constructor(private apiService:ApiService,private formBuilder:FormBuilder,private router:Router,private eventService:EventService){

  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      task_status_name: ['', [Validators.required]],
      company_id: ['', ],
      color: ['',Validators.required]
      });
      this.getCompanyId()
  }
  getCompanyId(){
   
        this.company= this.apiService.defaultCompanyValue
        this.companyId=this.company.id
        this.getCategory()
       
  }
  getCategory(){
    this.apiService.get('user/task_types?company_id=' + this.companyId).subscribe((res)=>{
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
      formdata.append('task_status_name',this.f['task_status_name'].value);
      formdata.append('company_id',this.company.id);
      formdata.append('color',this.f['color'].value)
      if(this.companyData.details.id){
        formdata.append('id',this.companyData.details.id)
        this.apiService.putMultipart('user/task_status',formdata).subscribe((res)=>{
          if(res.status==true){
                 this.saved.emit()    
                 this.eventService.broadcast('success', {page:'taskStatus',message:'Selected task status has been updated.'});

                 let el: HTMLElement = this.companydropdown.nativeElement;
                 el.click();
          }
          else{
            
          }
        })  
      }else{
        this.apiService.postMultipart('user/task_status',formdata).subscribe((res)=>{
          if(res.status==true){
                this.saved.emit()    
                this.eventService.broadcast('success', {page:'taskStatus',message:'Selected task status has been added.'});

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
    console.log(this.companyData)
    if(this.companyData.details.id){
      let data=this.companyData.details;
      this.form.patchValue({
        task_status_name:data.task_status_name,
        company_id:data.company_id,
        color:data.color
      })
    }else
    this.form.reset()
    this.submitted = false
  }
}
