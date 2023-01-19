import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  company={company_name:'',id:''}
  constructor(private apiService:ApiService,private router:Router){
    this.company=this.apiService.defaultCompanyValue
   
  }
  ngOnInit(): void {
    // this.apiService.get('user/companies/default').subscribe(res=>{
    //   if(res['status']==true){
    //     if(res['data'].length>0){
    //       this.company={company_name:res['data'][0]['company_name'],id:res['data'][0]['id']};
   
    //     }
    //     else
    //     this.router.navigateByUrl('/companies')
    //   }
    // })
  }
}
