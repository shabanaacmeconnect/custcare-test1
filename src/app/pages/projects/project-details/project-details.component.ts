import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  project_id='';
  projectDetails:any={tasks_count:0,project_name:''};
  companyid='';
  nameEditable=false;
  statusEditable=false;
  projectStatus: any;
constructor(private eventService:EventService ,private apiService:ApiService, private router:Router,private activatedRouter:ActivatedRoute){
  this.project_id=this.activatedRouter.snapshot.params['id']?this.activatedRouter.snapshot.params['id']:''
  if(this.project_id)   {
    this.router.navigate(['/projects',this.project_id,'tasks'])
    this.companyid=this.apiService.defaultCompanyValue.id;
    this.getDetails();
    this.getProjectStatus()
  }
  this.eventService.subscribe('task',(task) => {
    this.getDetails();
  })
}
getProjectStatus(){
  this.apiService.get('user/project_status?company_id=' + this.companyid).subscribe((res)=>{
    if(res['status']==true){
      this.projectStatus=res['data'];
    }
  })
}

getDetails(){
  this.apiService.get(`user/projects/details?id=${this.project_id}&company_id=${this.companyid}`).subscribe(res=>{
    if(res['status']==true){
      this.projectDetails=res['data'];
    }
  });
  
}
updateProject(type:string,event:any=null){
  if(event){
    if (event.key != "Enter") return
  }
  this.nameEditable=false;
  this.statusEditable=false;
  let formdata=new FormData();
  formdata.append('id',this.project_id)
  formdata.append('company_id',this.companyid)
  if(type=='project_status_id')formdata.append('project_status_id',this.projectDetails['project_status_id'])
 formdata.append('project_name',this.projectDetails['project_name'])
  this.apiService.putMultipart('user/projects',formdata).subscribe((res)=>{
    if(res.status==true){
        this.getDetails()
    }
    else{
      
    }
  })  

}
}
