import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent  implements OnInit,AfterViewInit{
  title='Add New'
  @Input() taskData:any;
  @Output() saved=new EventEmitter<any>();
  form!:FormGroup;
  submitted=false;
  clients=[];
  taskTypes=[];
  taskStatus=[];
  company={company_name:'',id:''}
  companyId:any
  startDateVal:any;
  bgColor = "#fff";
  project_id:any
  dateFormat:any
  @ViewChild('closemodal')  companydropdown!: ElementRef<HTMLElement>;
  @ViewChild('autofocus') autofocus!:ElementRef<HTMLElement>;
  rand: number=0;
  constructor(private route:ActivatedRoute,private apiService:ApiService,private formBuilder:FormBuilder,private router:Router,private eventService:EventService){

  }
  ngOnInit() {
    this.route.parent?.params.subscribe((params:any)=>{
      this.project_id=params['id'];
    })
    this.form = this.formBuilder.group({
      task_name: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(100)]],
      task_description:['',],
      due_date:['',],
      client_visibility:['',],
      task_type_id:[''],
      task_status_id:[''],
      section_id:[''],
      });
      this.getCompanyId()
      

  }
  getCategory(){
    // this.apiService.get('user/clients?').subscribe((res)=>{
    //   if(res['status']==true){
    //     this.clients=res['data'];
    //   }
    // })
    this.apiService.get('user/task_types?company_id=' + this.companyId).subscribe((res)=>{
      if(res['status']==true){
        this.taskTypes=res['data'];
      }
    })
    this.apiService.get('user/task_status?company_id=' + this.companyId).subscribe((res)=>{
      if(res['status']==true){
        this.taskStatus=res['data'];
      }
    })
  }  
  getCompanyId(){
   
        this.company=this.apiService.defaultCompanyValue;
        this.companyId=this.company.id
        this.getCategory();
       
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
      formdata.append('task_name',this.f['task_name'].value);
      // formdata.append('task_description',this.f['task_description'].value);
      // formdata.append('due_date',this.f['due_date'].value);
     if(this.f['task_type_id'].value) formdata.append('task_type_id',this.f['task_type_id'].value);
     if(this.f['task_status_id'].value) formdata.append('task_status_id',this.f['task_status_id'].value);
      // formdata.append('client_visibility',this.f['client_visibility'].value);
      // formdata.append('section_id','1');
      formdata.append('project_id',this.project_id);
      formdata.append('company_id',this.company.id);
      if(this.taskData.details.id){
        formdata.append('id',this.taskData.details.id)
        this.apiService.putMultipart('user/tasks',formdata).subscribe((res)=>{
          if(res.status==true){
                this.saved.emit({type:'edit',data:res['data'][0]})    
                // this.eventService.broadcast('success', {page:'taskForm',message:'Selected task has been updated.'});
                let el: HTMLElement = this.companydropdown.nativeElement;
                el.click();
          }
          else{

          }
        })  
      }else{
        this.apiService.postMultipart('user/tasks',formdata).subscribe((res)=>{
          if(res.status==true){
                this.saved.emit({type:'add',data:res['data'][0]})  
                // this.eventService.broadcast('success', {page:'taskForm',message:'New task has been added.'});
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
    if(this.taskData.details.id){
      let data=this.taskData.details;
      this.project_id=this.taskData.details.project_id
      this.title=this.taskData.title
      // this.dateFormat=data.due_date.slice(0,10)
      this.form.patchValue({
        task_name:data.task_name,
        // task_description:data.task_description,
        // due_date:this.dateFormat,
        task_type_id:data.task_type_id,
        task_status_id:data.task_status_id,
        company_id:data.company_id,
        // client_visibility:data.client_visibility,
        // project_id:data.project_id,
        // section_id:data.section_id,
      })
      this.apiService.get('user/tasks/details?company_id='+data.company_id+'&id='+this.taskData.details.id).subscribe(res=>{
        if(res['status']==true){
          this.taskData.details=res['data'][0]
        }
      })
    }else
    this.form.reset()
    this.submitted = false
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.autofocus.nativeElement.focus()
    }, 100);
  }
  getRandom(){
    this.rand= Math.random();
    console.log(this.rand)
  }
}
