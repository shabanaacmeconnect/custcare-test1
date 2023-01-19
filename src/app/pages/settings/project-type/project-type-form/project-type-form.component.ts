import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-project-type-form',
  templateUrl: './project-type-form.component.html',
  styleUrls: ['./project-type-form.component.css']
})
export class ProjectTypeFormComponent implements OnInit,OnChanges{
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
      project_type: ['',[Validators.required] ],
      company_id: [''],
      // color: ['', [Validators.required]],
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
      formdata.append('project_type',this.f['project_type'].value);
      formdata.append('company_id',this.cid)
      // formdata.append('color',this.f['color'].value)
      if(this.companyData.details.id){
        formdata.append('id',this.companyData.details.id)
        this.apiService.putMultipart('user/project_types',formdata).subscribe((res)=>{
          console.log(res)
          if(res.status==true){
            this.saved.emit()    
            this.eventService.broadcast('success', {page:'projectForm',message:'Selected project type has been updated.'});

          let el: HTMLElement = this.companydropdown.nativeElement;
                el.click();
          }
          else{

          }
        })  
      }else{
        this.apiService.postMultipart('user/project_types',formdata).subscribe((res)=>{
          console.log(res)

          if(res.status==true){
                 this.saved.emit()    
                 this.eventService.broadcast('success', {page:'projectForm',message:'Selected project type has been added.'});

                 let el: HTMLElement = this.companydropdown.nativeElement;
                 el.click();
          }
          else{
            // this.eventService.broadcast('error', {page:'projectForm',message:'Selected project type has been updated.'});

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
        company_id:data.id,
        project_type:data.project_type,
        // color:data.color

      })
    }else
    this.form.reset()
    this.submitted = false
  }
}
