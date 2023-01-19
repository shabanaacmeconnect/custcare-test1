import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Toastify from 'toastify-js';
import * as $ from "jquery"
import { EventService } from '../core/services/event.service';
import { ApiService } from '../core/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit{
  message:{page:string,message:string}={page:'',message:''};
  accountverified=true;
  topbar=true;
  constructor(private router:Router,private eventService:EventService, private apiService:ApiService){
    
  }
  ngAfterViewInit(): void {
    this.router.events.forEach((event) => {

  if( window.location.pathname.includes('/invitations')){
    this.topbar=false;
   }else{
    this.topbar=true
   }
  })

    // this.router.navigate(['/invitations']);
    // this.apiService.get('accountverified').subscribe(res=>{
    //   if(res['status']==true){
    //     this.accountverified=true;
    //   }
    // })
    this.eventService.subscribe('success', (data) => {
      this.message=data;
      setTimeout(()=>{
        Toastify({
          node: $("#success-notification-content")
              .clone()
              .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
      }).showToast();
      },100)
     
      })
      this.eventService.subscribe('error', (data) => {
        this.message=data;
        setTimeout(()=>{
          Toastify({
            node: $("#error-notification-content")
                .clone()
                .removeClass("hidden")[0],
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
        }).showToast();
        },100)
       
        })
    }
    resentemail(){
      this.apiService.post('api/resendEmail',{}).subscribe(res=>{
        if(res['status']==true){
          this.eventService.broadcast('success', {page:'Account Verification',message:'Verification email has been sent. Please check you email.'});
        }
      })
    }
}
