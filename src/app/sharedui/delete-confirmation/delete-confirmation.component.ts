import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnChanges{

  @Output() confirmed=new EventEmitter<any>();
  @Input() message!: { title: string, body: string, id: number,type:string }

  delete(){
    this.confirmed.emit(this.message);
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
