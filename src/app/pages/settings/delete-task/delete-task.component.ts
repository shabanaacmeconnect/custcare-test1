import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  page={size:1000,page:1,totalElements:0};
  selectedAll=false;
  tasks:any=[];
  message: { title: string, body: string, id: number,type:string }={title:'',body:'',id:0,type:''}
  company_id=''
  company={company_name:'',id:''}
  project_id:any='';projects=[]
  selectedTasks:any=[]
  taskTypes: any=[];task_type_id:any;
  taskStatus: any=[];task_status_id:any;
  newtask={name:'',type:'',status:''};
  filterObject={keyword:'',task_status_id:'',task_type_id:'',project_id:''}
  keyword='';
  from_date='';
  to_date=''
  from: any;
  to: any;
  @ViewChild('filterdropdown')  filterdropdown!: ElementRef<HTMLElement>;
  constructor(private eventservice:EventService, private route:ActivatedRoute, private apiService:ApiService,private eventService:EventService,private router:Router){
 // Show modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.show(); // Hide modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.hide(); // Toggle modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.toggle(); 
 
}
  ngOnInit(): void {
     this.route.parent?.params.subscribe((params:any)=>{
      this.project_id=params['id'];
      console.log(this.project_id)
      this.company=this.apiService.defaultCompanyValue
      this.company_id=this.company.id
      this.getList()
      this.getDropdown();
      
    })
    
  }
  getList(){
    let url ="user/tasks?company_id=" + this.company_id + "&page=" +  this.page.page +"&perPage=" +this.page.size +"&keyword=" +this.keyword +"&deleted=" +1;
    if(this.project_id)
    url+="&project_id="+this.project_id ;
    if(this.filterObject.keyword)
    url+="&keyword="+this.filterObject.keyword ;
    console.log(this.from_date,this.from_date==undefined)
    // if(this.from_date!==undefined ||this.to_date!==undefined ||  new Date(this.from).getTime()>new Date(this.to).getTime())
    if(this.from_date||this.to_date||  new Date(this.from).getTime()>new Date(this.to).getTime())

    {
      url+='&from_date='+this.from+'&to_date='+this.to;
    }
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
    
    if(this.project_id==undefined){
      this.apiService.get('user/projects?company_id=' + this.company_id).subscribe((res)=>{
        if(res['status']==true){
          this.projects=res['data'];
        }
      });
    }
  }

  callConfirm(type:string){
    this.message={title:'',body:'',id:0,type:type}
  }
  confirmAction(event:any){
    if(event['type']=="undodelete"){
      this.apiService.put("user/undoDeletetasks?id="+this.selectedTasks.join(',')+"&company_id=" + this.company_id +"&project_id=" + this.project_id,{}).subscribe((res) => {
        if (res["status"] == true) {
          this.eventService.broadcast('success', {page:'Company',message:'Undo selected tasks.'});
          this.getList();
          this.eventService.broadcast('task');
          
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
  toggledropdown(){
    let el: HTMLElement = this.filterdropdown.nativeElement;
    el.click();
  }
  search(){
    this.page.page=1;
    this.getList();
    this.toggledropdown();
  }
  dateformating(d:any){
    if(d.month){
     if (d.month.length < 2) 
   d.month = '0' + d.month;
   if (d.day.length < 2) 
     d.day = '0' + d.day;
   let dateform= [d.year, d.month, d.day].join('-');
   return dateform;
    }else{
      return d;
    }
   
  }
  datesearch(){ 
    if(this.from_date)
   this.from=this.dateformating(this.from_date)
   if(this.to_date)
   this.to=this.dateformating(this.to_date)
   if(this.from_date==undefined ||this.to_date==undefined || new Date(this.from).getTime()>new Date(this.to).getTime())
     {
       console.log( new Date(this.from).getTime(), new Date(this.to).getTime())
       return;
     }else{
       this.page.page=1
       this.getList();
     }
  }
  isSameYear(index:number){
    if(new Date(this.tasks[index]['created_at']).getFullYear()!=new Date().getFullYear())
    return true;
    return false;
  }
}
