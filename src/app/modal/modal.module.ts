import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { icons, LucideAngularModule } from 'lucide-angular';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({  
  declarations: [
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule.pick(icons),

  ],
  exports:[ErrorMessageComponent]

})
export class ShareduiModule { }
