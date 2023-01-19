import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit{
  companyData={title:'Add New', details:{}};
  page={size:10,page:1,totalElements:0};
  keyword='';
  companies=[];
  message: { title: string, body: string, id: number,type:string }={title:'',body:'',id:0,type:''}
  constructor(private apiService:ApiService,private eventService:EventService){
 // Show modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.show(); // Hide modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.hide(); // Toggle modal const el = document.querySelector("#programmatically-modal"); const modal = tailwind.Modal.getOrCreateInstance(el); modal.toggle(); 
  }
  ngOnInit(): void {
    this.getList()
  }
  getList(){
    let url ="user/companies?page=" +  this.page.page +"&perPage=" +this.page.size +"&keyword=" +this.keyword;
  this.apiService.get(url).subscribe((res) => {
    if (res["status"] == true) {
      this.companies = res["data"];
      this.page.totalElements = res["elementCount"];
    }
  });
  }
  edit(details:any){
    this.companyData={title:'Edit',details:details};
  }
  addNew(){
  }
  saved(){
    this.getList()
  }
  callConfirm(id:number,type:string){
    this.message={title:'',body:'',id:id,type:type}
  }
  confirmAction(event:any){
   
    if(event['type']=="delete"){
      this.apiService.delete("user/deletecompanies?id="+event['id']).subscribe((res) => {
        if (res["status"] == true) {
          this.eventService.broadcast('success', {page:'Company',message:'Deleted selected company.'});
        this.getList()
        }
      });
    }else{
      this.apiService.put(`user/statuscompanies?value=${event['type']=='enable'?1:0}&id=${event['id']}`,{}).subscribe((res) => {
        if (res["status"] == true) {
          if(event.type=='enable')
          this.eventService.broadcast('success', {page:'Company',message:'Selected company has been enabled.'});
          else
          this.eventService.broadcast('success', {page:'Company',message:'Selected company has been disabled.'});
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
  makeDefault(company:any){
    let formdata=new FormData();
    formdata.append('value','1')
    formdata.append('id',company['id'])
    this.apiService.putMultipart('user/companies/default',formdata).subscribe(res=>{
      this.eventService.broadcast('company',company);
      this.getList()
    })
  }
}
