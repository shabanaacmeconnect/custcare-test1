import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { icons, LucideAngularModule } from 'lucide-angular';
import { PaginationComponent } from './pagination/pagination.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@NgModule({  
  declarations: [
    DeleteConfirmationComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule.pick(icons),

  ],
  exports:[DeleteConfirmationComponent,PaginationComponent]

})
export class ShareduiModule { }
