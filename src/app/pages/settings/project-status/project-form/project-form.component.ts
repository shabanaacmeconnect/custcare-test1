import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit,OnChanges{
  title='Add New'
  @Input() companyData:any;
  @Output() saved=new EventEmitter<any>();
  form!:FormGroup;
  submitted=false;
  categories=[];
  cid='';
  @ViewChild('closemodal')  companydropdown!: ElementRef<HTMLElement>;

  constructor(private apiService:ApiService,private formBuilder:FormBuilder, private activeRoute:ActivatedRoute,private eventService:EventService){

  }
  ngOnInit() {
    
      this.cid= this.apiService.defaultCompanyValue['id']
    
    this.form = this.formBuilder.group({
      project_status_name: ['', [Validators.required]],
      company_id: [''],
      color: ['', Validators.required],
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
      formdata.append('project_status_name',this.f['project_status_name'].value);
      formdata.append('company_id',this.cid)
      formdata.append('color',this.f['color'].value)
      if(this.companyData.details.id){
        formdata.append('id',this.companyData.details.id)
        this.apiService.putMultipart('user/project_status',formdata).subscribe((res)=>{
          if(res.status==true){
            this.saved.emit()    
            this.eventService.broadcast('success', {page:'projectStatus',message:'Selected project status has been updated.'});

            let el: HTMLElement = this.companydropdown.nativeElement;
            el.click();
          }
          else{
            
          }
        })  
      }else{
        this.apiService.postMultipart('user/project_status',formdata).subscribe((res)=>{
          if(res.status==true){
            this.saved.emit()
            this.eventService.broadcast('success', {page:'projectStatus',message:'Selected project status has been added.'});
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
    if(this.companyData.details.id){
      let data=this.companyData.details;
      this.form.patchValue({
        company_id:data.id,
        project_status_name:data.project_status_name,
        color:data.color

      })
    }else
    this.form.reset()
    this.submitted = false
  }
}
