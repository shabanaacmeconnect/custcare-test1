import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';
import * as $ from 'jquery'
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  company={company_name:'Company',id:''}
  showdropdown=true;
  currentUser:any;
  @ViewChild('companydropdown')  companydropdown!: ElementRef<HTMLElement>;
  constructor(private router:Router,private apiService:ApiService,private eventService:EventService){
   this.currentUser=this.apiService.currentUserValue
    this.eventService.subscribe('company', (company) => {
      this.company={company_name:company['company_name'],id:company['id']}
      apiService.defaultCompanySubject.next(this.company)
    })
    this.checkInvitations()
   
    router.events.forEach((event) => {
      if(window.location.pathname=='/companies')
        this.showdropdown=false;
      else
        this.showdropdown=true
    });
  }
  logout(){
    this.apiService.logout();
    
  }
  toggleDropdown(){
    let el: HTMLElement = this.companydropdown.nativeElement;
    el.click();
  }
  checkInvitations(){
    this.apiService.get('user/company_invites').subscribe(res=>{
      if(res['status']==true)
      if(res['elementCount']>0){
        this.router.navigate(['/invitations']);
      }else{
        this.apiService.get('user/companies/default').subscribe(res=>{
          if(res['status']==true){
            if(res['data'].length>0){
              this.company={company_name:res['data'][0]['company_name'],id:res['data'][0]['id']};
              localStorage.setItem('defaultCompany',JSON.stringify(this.company))
              this.apiService.defaultCompanySubject.next(this.company)
            }
            else
            this.router.navigateByUrl('/companies')
          }
        })
      }
    })
  }
}
