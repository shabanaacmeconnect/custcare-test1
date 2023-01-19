import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnChanges {
  @Input() message:{page:string,message:string}={page:'',message:''};
  ngOnChanges(){

  }
}
