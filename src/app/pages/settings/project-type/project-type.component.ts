import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.css']
})
export class ProjectTypeComponent implements OnInit{
  companyData={title:'Add New', details:{}};
  page={size:10,page:1,totalElements:0};
  keyword='';
  company_id='';
  projectType=[];
  message: { title: string, body: string, id: number,type:string }={title:'',body:'',id:0,type:''}
  constructor(private apiService:ApiService,private eventService:EventService,private activeRoute:ActivatedRoute ){
 // Show modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.show(); // Hide modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.hide(); // Toggle modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.toggle(); 
  }
  ngOnInit(): void {
   this.company_id= this.apiService.defaultCompanyValue['id']
    this.getList()
  }
  getList(){
    let url ="user/project_types?company_id="+this.company_id+"&page=" +  this.page.page +"&perPage=" +this.page.size +"&keyword=" +this.keyword;
  this.apiService.get(url).subscribe((res) => {
    if (res["status"] == true) {
      this.projectType = res["data"];
      this.page.totalElements = res["elementCount"];
    }
  });
  }
  edit(details:any){
    console.log(details)
    this.companyData={title:'Edit',details:details};
  }
  addNew(){
    
    this.companyData={title:'Add',details:''};

  }
  saved(){
    this.getList()
  }
  callConfirm(id:number,type:string){
    this.message={title:'',body:'',id:id,type:type}
  }
  confirmAction(event:any){
   
    if(event['type']=="delete"){
      this.apiService.delete("user/deleteproject_types?id="+event['id']+"&company_id="+this.company_id).subscribe((res) => {
        if (res["status"] == true) {
          this.eventService.broadcast('success', {page:'Company',message:'Deleted selected project type.'});
        this.getList()
        }
      });
    }else{
      this.apiService.put(`user/statusproject_types?company_id=${this.company_id}&value=${event['type']=='enable'?1:0}&id=${event['id']}`,{}).subscribe((res) => {
        if (res["status"] == true) {
          if(event.type=='enable')
          this.eventService.broadcast('success', {page:'Company',message:'Selected project type has been enabled.'});
          else
          this.eventService.broadcast('success', {page:'Company',message:'Selected project type has been disabled.'});
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
  makeDefault(projTp:any){
    let formdata=new FormData();
    console.log(formdata)
    formdata.append('value','1')
    formdata.append('id',projTp['id'])
    this.apiService.putMultipart('user/project_types',formdata).subscribe(res=>{
      this.eventService.broadcast('company',projTp);
      this.getList()
    })
  }
}
