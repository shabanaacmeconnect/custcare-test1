import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit{
  invitations=0;
  invitations_teams: any;
  invitations_clients: any;
  constructor(private apiService:ApiService,private router:Router){

  }
  ngOnInit(){
    this.getInvitations();
  }
  getInvitations(){
     this.apiService.get('user/company_invites').subscribe(res=>{
      if(res['status']==true){
        if(res['elementCount']>0){
          this.invitations=res['elementCount']
          this.invitations_teams=res['teamMember_invites'];
          this.invitations_clients=res['client_invites'];
        }else{
          this.router.navigate(['/dashboard']); 
        }
        
      }
    })
  }
  respond(data:any, type:number){
    let form=new FormData();
    form.append('id',data.id)
    form.append('approve',type.toString())
    form.append('type',data.type)
    this.apiService.putMultipart('user/statuscompany_invites',form).subscribe(res=>{
    if(res['status']==true){
      this.getInvitations();
    }
    })
  }
}
