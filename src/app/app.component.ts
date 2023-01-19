import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Custcare';
  public pageLoader:boolean=true; 
  loaderSubscription!: Subscription;
  
  constructor(private apiService: ApiService) {

  }
  ngOnInit(){
    this.pageLoader=false;
    this.loaderSubscription=this.apiService.getApiLoaderStatus().pipe().subscribe((response:any) => { 
      if(response.show)this.pageLoader=true;
       else this.pageLoader=false;
     });
    
   
  }
  ngOnDestroy(){
    this.loaderSubscription.unsubscribe();
  }
  

}
