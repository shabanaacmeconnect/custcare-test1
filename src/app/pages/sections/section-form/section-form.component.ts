import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})
export class SectionFormComponent {

  title='Add New'
  @Input() sectionData:any;
  @Output() saved=new EventEmitter<any>();
  form!:FormGroup;
  submitted=false;
  categories=[];
  company={company_name:'',id:''}
  project_id:any
  @ViewChild('closemodal')  companydropdown!: ElementRef<HTMLElement>;

  constructor(private activeRoute:ActivatedRoute, private apiService:ApiService,private formBuilder:FormBuilder,private router:Router,private eventService:EventService){

  }
  ngOnInit() {
    this.project_id= this.activeRoute.snapshot.paramMap.get("id")?this.activeRoute.snapshot.paramMap.get("id"):'';

    this.form = this.formBuilder.group({
      section_name: ['', [Validators.required]],
      project_id: ['', ],
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
      formdata.append('section_name',this.f['section_name'].value);
      formdata.append('project_id',this.project_id);
      console.log(formdata)
      if(this.sectionData.details.id){
        formdata.append('id',this.sectionData.details.id)
        this.apiService.putMultipart('user/sections',formdata).subscribe((res)=>{
          if(res.status==true){
                this.saved.emit()    
                this.eventService.broadcast('success', {page:'SectionForm',message:'Selected section has been updated.'});

          }
          else{
            
          }
        })  
      }else{
        this.apiService.postMultipart('user/sections',formdata).subscribe((res)=>{
          if(res.status==true){
                 this.saved.emit()    
                 this.eventService.broadcast('success', {page:'SectionForm',message:'Selected section has been updated.'});

          }
          else{
            
          }
        })  

      }
     
       
    }
  }
  
  ngOnChanges(){
    console.log(this.sectionData.details.id)
    if(this.sectionData.details.id){
      let data=this.sectionData.details;
      this.form.patchValue({
        section_name:data.section_name,
        project_id:data.project_id,
      })
    }else
    this.form.reset()
    this.submitted = false
  }
}
