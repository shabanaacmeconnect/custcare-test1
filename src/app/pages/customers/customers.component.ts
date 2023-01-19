import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  projectData={title:'Add New', details:{}};
  page={size:10,page:1,totalElements:0};
  keyword='';
  customers=[];
  message: { title: string, body: string, id: number,type:string }={title:'',body:'',id:0,type:''}
  company_id=''
  company={company_name:'',id:''}

  constructor(private activeRoute:ActivatedRoute, private apiService:ApiService,private eventService:EventService,private router:Router){
 // Show modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.show(); // Hide modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.hide(); // Toggle modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.toggle(); 
 
}
  ngOnInit(): void {
    this.company=this.apiService.defaultCompanyValue
    this.company_id=this.company.id
    this.getList()
  }
  getList(){
    let url ="user/company_requests/clients?company_id=" + this.company_id + "&page=" +  this.page.page +"&perPage=" +this.page.size +"&keyword=" +this.keyword;
  this.apiService.get(url).subscribe((res) => {
    if (res["status"] == true) {
      this.customers = res["data"];
      this.page.totalElements = res["elementCount"];
    }
  });
  }
  edit(details:any){
    this.projectData={title:'Edit',details:details};
  }
  addNew(){
    this.projectData={title:'Add',details:''};
  }
  saved(){
    this.getList()
  }
  callConfirm(id:number,type:string){
    this.message={title:'',body:'',id:id,type:type}
  }
  confirmAction(event:any){
   
    if(event['type']=="delete"){
      this.apiService.delete("user/deleteprojects?id="+event['id'] +"&company_id=" + this.company_id).subscribe((res) => {
        if (res["status"] == true) {
          this.eventService.broadcast('success', {page:'Company',message:'Deleted selected project.'});
        this.getList()
        }
      });
    }else{
      this.apiService.put(`user/statusprojects?value=${event['type']=='enable'?1:0}&id=${event['id']}`+"&company_id=" + this.company_id,{}).subscribe((res) => {
        if (res["status"] == true) {
          if(event.type=='enable')
          this.eventService.broadcast('success', {page:'Customer',message:'Selected customer has been enabled.'});
          else
          this.eventService.broadcast('success', {page:'Customer',message:'Selected customer has been disabled.'});
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
