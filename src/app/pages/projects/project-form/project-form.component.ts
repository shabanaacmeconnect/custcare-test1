import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
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
  startDateVal:any;
  @ViewChild('closemodal')  companydropdown!: ElementRef<HTMLElement>;

  constructor(private apiService:ApiService,private formBuilder:FormBuilder,private router:Router,private eventService:EventService){

  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      project_name: ['', [Validators.required]],
      company_id: ['', ],
      project_status_id:[''],
      project_type_id:[''],
      client_id:[''],
      start_date:[''],
      end_date:[''],
      });
      this.company=this.apiService.defaultCompanyValue
      this.companyId=this.company.id      
      this.getCategory()
  }
  getCategory(){
    // this.apiService.get('user/clients?').subscribe((res)=>{
    //   if(res['status']==true){
    //     this.clients=res['data'];
    //   }
    // })
    this.apiService.get('user/project_types?company_id=' + this.companyId).subscribe((res)=>{
      if(res['status']==true){
        this.projectTypes=res['data'];
      }
    })
    this.apiService.get('user/project_status?company_id=' + this.companyId).subscribe((res)=>{
      if(res['status']==true){
        this.projectStatus=res['data'];
      }
    })
  }  
 
  
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  startDate(event: any)
  {
    this.startDateVal= event.target.value;
  }
  formsubmitted() {
    this.submitted = true;
   
    if (this.form.invalid) {
      return;
    } else {
      let formdata=new FormData();
      formdata.append('project_name',this.f['project_name'].value);
      // formdata.append('project_status_id',this.f['project_status_id'].value);
      // formdata.append('project_type_id',this.f['project_type_id'].value);
      // formdata.append('start_date',this.f['start_date'].value);
      // formdata.append('end_date',this.f['end_date'].value);
      // formdata.append('client_id',this.f['client_id'].value);
      formdata.append('company_id',this.company.id);
      if(this.projectData.details.id){
        formdata.append('id',this.projectData.details.id)
        this.apiService.putMultipart('user/projects',formdata).subscribe((res)=>{
          if(res.status==true){
                this.saved.emit()    
                this.eventService.broadcast('success', {page:'projectForm',message:'Selected project has been updated.'});
                let el: HTMLElement = this.companydropdown.nativeElement;
                el.click();
          }
          else{

          }
        })  
      }else{
        this.apiService.postMultipart('user/projects',formdata).subscribe((res)=>{
          if(res.status==true){
                this.saved.emit()  
                this.eventService.broadcast('success', {page:'projectForm',message:'New project has been added.'});
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
        project_name:data.project_name,
        project_status_id:data.project_status_id,
        project_type_id:data.project_type_id,
        start_date:data.start_date,
        end_date:data.end_date,
        company_id:data.company_id,
        client_id:data.client_id
      })
    }else
    {this.form.reset()
    this.submitted = false}
  }
}
