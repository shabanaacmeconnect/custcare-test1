import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
details:any;
company_id:any;
constructor(private apiService:ApiService){
}
ngOnInit(): void {
  this.company_id=this.apiService.defaultCompanyValue.id
  if(this.company_id)
  this.getDetails()
}
getDetails(){
  this.apiService.get('user/userProfile?company_id='+this.company_id).subscribe(res=>{
    if(res['status']==true){
      this.details=res['data']
    }
  })
}
}
