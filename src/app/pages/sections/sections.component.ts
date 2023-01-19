import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {
  sectionData={title:'Add New', details:{}};
  page={size:10,page:1,totalElements:0};
  keyword='';
  sections=[];
  message: { title: string, body: string, id: number,type:string }={title:'',body:'',id:0,type:''}
  company_id=''
  project_id:any
  company:any=[]
  constructor(private activeRoute:ActivatedRoute, private apiService:ApiService,
    private eventService:EventService,private router:Router){
 // Show modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.show(); // Hide modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.hide(); // Toggle modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.toggle(); 
 
}
  ngOnInit(): void {
    
    this.project_id= this.activeRoute.snapshot.paramMap.get("id")?this.activeRoute.snapshot.paramMap.get("id"):'';
    this.apiService.get('user/companies/default').subscribe(res=>{
      if(res['status']==true){
        if(res['data'].length>0){
          this.company={company_name:res['data'][0]['company_name'],id:res['data'][0]['id']}
          this.company_id=this.company.id
          this.getList()}
          
        }
  })

  }
  getList(){
    let url ="user/sections?project_id=" +  this.project_id + "&page=" +  this.page.page +"&perPage=" +this.page.size +"&keyword=" +this.keyword;
  this.apiService.get(url).subscribe((res) => {
    if (res["status"] == true) {
      this.sections = res["data"];
      this.page.totalElements = res["elementCount"];
    }
  });
  }
  edit(details:any){
    this.sectionData={title:'Edit',details:details};
  }
  addNew(){
    this.sectionData={title:'Add',details:''};
  }
  saved(){
    this.getList()
  }
  callConfirm(id:number,type:string){
    this.message={title:'',body:'',id:id,type:type}
  }
  confirmAction(event:any){
   
    if(event['type']=="delete"){
      this.apiService.delete("user/deletesections?id="+event['id']+"&project_id=" + this.project_id).subscribe((res) => {
        if (res["status"] == true) {
          this.eventService.broadcast('success', {page:'Sections',message:'Deleted selected section.'});
        this.getList()
        }
      });
    }else{
      this.apiService.put(`user/statustask_types?value=${event['type']=='enable'?1:0}&id=${event['id']}`,{}).subscribe((res) => {
        if (res["status"] == true) {
          if(event.type=='enable')
          this.eventService.broadcast('success', {page:'Sections',message:'Selected section has been enabled.'});
          else
          this.eventService.broadcast('success', {page:'Sections',message:'Selected section has been disabled.'});
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
  search(){
    this.page.page=1;
    this.getList()
  }
}
