import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  taskData={title:'Add New', details:{}};
  page={size:1000,page:1,totalElements:0};
  selectedAll=false;
  tasks:any=[];
  team_member_id=''
  message: { title: string, body: string, id: number,type:string }={title:'',body:'',id:0,type:''}
  company_id=''
  company={company_name:'',id:''}
  project_id:any='';projects=[]
  selectedTasks:any=[]
  taskTypes: any=[];task_type_id:any;
  taskStatus: any=[];task_status_id:any;
  newtask={name:'',type:'',status:''};
  teams=[];
  filterObject={keyword:'',task_status_id:'',task_type_id:'',project_id:''}
  // @ViewChild('filterdropdown')  filterdropdown!: ElementRef<HTMLElement>;
  constructor(private eventservice:EventService, private route:ActivatedRoute, private apiService:ApiService,private eventService:EventService,private router:Router){
 // Show modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.show(); // Hide modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.hide(); // Toggle modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.toggle(); 
 
}
  ngOnInit(): void {
     this.route.parent?.params.subscribe((params:any)=>{
      this.project_id=params['id'];
      this.company=this.apiService.defaultCompanyValue
      this.company_id=this.company.id
      this.getList()
      this.getDropdown();
      
    })
    
  }
  getList(){
    console.log(this.filterObject.keyword,this.filterObject.project_id,this.filterObject.task_type_id)
    let url ="user/tasks?company_id=" + this.company_id + "&page=" +  this.page.page +"&perPage=" +this.page.size ;
    if(this.project_id)
    url+="&project_id="+this.project_id ;
    if(this.filterObject.keyword)
    url+="&keyword="+this.filterObject.keyword ;
    if(this.filterObject.project_id)
    url+="&project_id="+this.filterObject.project_id ;
    if(this.filterObject.task_status_id)
    url+="&task_status_id="+this.filterObject.task_status_id ;
    if(this.filterObject.task_type_id)
    url+="&task_type_id="+this.filterObject.task_type_id ;
    this.apiService.get(url).subscribe((res) => {
    if (res["status"] == true) {
      this.tasks = res["data"];
      this.page.totalElements = res["elementCount"];
      this.selectedTasks=[];
      this.selectedAll=false;
      this.task_type_id='';this.task_status_id='';
    }
  });
  }
  getDropdown(){

    this.apiService.get('user/task_types?company_id=' + this.company_id).subscribe((res)=>{
      if(res['status']==true){
        this.taskTypes=res['data'];
      }
    })
    this.apiService.get('user/task_status?company_id=' + this.company_id).subscribe((res)=>{
      if(res['status']==true){
        this.taskStatus=res['data'];
      }
    });
    this.apiService.get('user/company_requests/team_members?approved=1&company_id='+this.company_id).subscribe((res)=>{
      if(res['status']==true){
        this.teams=res['data'];
      }
    });
    if(this.project_id==undefined){
      this.apiService.get('user/projects?company_id=' + this.company_id).subscribe((res)=>{
        if(res['status']==true){
          this.projects=res['data'];
        }
      });
    }
  }
  edit(details:any){
    this.taskData={title:'Edit',details:details};
  }
  addNew(){
    this.taskData={title:'Add',details:''};
  }
  saved(data:any){
    if(data.type=='add'){
      this.tasks.unshift(data.data)
      this.eventService.broadcast('task')
    }
    if(data.type=='edit'){
      let index=this.tasks.findIndex((x:any)=>x.id==data.data.id);
      this.tasks[index]=data.data;
    }
    
  }
  addtaskonenter(event:any){
    if(event){
      if (event.key != "Enter") return;
      this.newTaskAdded()
    }
  }
  newTaskAdded(){
    let formdata=new FormData();
    formdata.append('task_name',this.newtask.name);
   if(this.newtask.type) formdata.append('task_type_id',this.newtask.type);
   if(this.newtask.status) formdata.append('task_status_id',this.newtask.status);
    formdata.append('project_id',this.project_id);
    formdata.append('company_id',this.company.id);
    this.apiService.postMultipart('user/tasks',formdata).subscribe((res)=>{
      if(res.status==true){
           this.saved({type:'add',data:res['data'][0]});
           this.newtask.name='';
      }
    })
  }
  callConfirm(type:string){
    this.message={title:'',body:'',id:0,type:type}
  }
  confirmAction(event:any){
    if(event['type']=="delete"){
      this.apiService.delete("user/deletetasks?id="+this.selectedTasks.join(',')+"&company_id=" + this.company_id +"&project_id=" + this.project_id).subscribe((res) => {
        if (res["status"] == true) {
          this.eventService.broadcast('success', {page:'Company',message:'Deleted selected tasks.'});
          this.getList();
          this.eventService.broadcast('task');
          
        }
      });
    }else if(event=='type'){
      this.apiService.put(`user/tasks/task_types?task_type_id=${this.task_type_id}&id=${this.selectedTasks.join(',')}`+"&company_id=" + this.company_id +"&project_id=" + this.project_id,{}).subscribe((res) => {
        if (res["status"] == true) {
           this.getList()
        }
      });
    }else if(event=='status'){
      this.apiService.put(`user/tasks/type_status?task_status_id=${this.task_status_id}&id=${this.selectedTasks.join(',')}`+"&company_id=" + this.company_id +"&project_id=" + this.project_id,{}).subscribe((res) => {
        if (res["status"] == true) {
           this.getList()
        }
      });
    }
   
  }

  pageCopy(){
    return this.page
 }
  changePage(event:any){
    this.page.page=event.page;
    this.page.size=event.size
    this.getList()
  }

  checklist(id:number,i:number){
    if(this.selectedTasks.includes(id)){
      this.tasks[i]['selected']=false
      this.selectedTasks.splice(this.selectedTasks.indexOf(id),1)
    }else{
      this.tasks[i]['selected']=true
      this.selectedTasks.push(id)
    }
  }
  selectAll(){
    this.selectedTasks=[];
    setTimeout(() => {
      if(this.selectedAll==true){
        this.selectedTasks=[...this.tasks.map((x:any)=>x['id'])];
        this.tasks.forEach((x:any,i:number)=>this.tasks[i]['selected']=true)
      }else{
        this.tasks.forEach((x:any,i:number)=>this.tasks[i]['selected']=false)
      }
    }, 100);
  
  }
  // toggledropdown(){
  //   let el: HTMLElement = this.filterdropdown.nativeElement;
  //   el.click();
  // }
  search(){
    this.page.page=1;
    this.getList();
    // this.toggledropdown();
  }
  clear(){
    // this.toggledropdown();
    this.filterObject={keyword:'',task_status_id:'',task_type_id:'',project_id:''}
    this.page.page=1;
    this.getList();
  }
  changeTeam(i:number){
    let formdata=new FormData();
    formdata.append('task_id',this.tasks[i]['id'])
    formdata.append('project_id',this.project_id)
    formdata.append('company_id',this.company_id)
    formdata.append('teamMember_user_id',this.tasks[i]['team_member_id'])
    this.apiService.putMultipart('user/tasks/assignteamMember',formdata).subscribe((res)=>{
      if(res.status==true){
         
      }
    })
  }
  isSameYear(index:number){
    if(new Date(this.tasks[index]['created_at']).getFullYear()!=new Date().getFullYear())
    return true;
    return false;
  }
}
