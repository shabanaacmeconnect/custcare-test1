import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-task-chat',
  templateUrl: './task-chat.component.html',
  styleUrls: ['./task-chat.component.css']
})
export class TaskChatComponent implements OnChanges,OnInit{
  @Input() details:any;
  chats:any;
  currentUser:any;
  formData!: FormGroup;
  chatSubmit!: boolean;
  logo: any;
  sizeError: boolean=false;
  imageType: boolean=true;
  message='';
  emojitype: any;
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set :any= 'twitter';

  @ViewChild('scroll')  scroll!: ElementRef<HTMLElement>;

  constructor(private eventService:EventService ,private apiService:ApiService,private formBuilder:FormBuilder){
    this.currentUser=this.apiService.currentUserValue;
  }
  ngOnInit(){
    this.formData=this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
  if(this.details.thread)this.getChats()
  }
 
  getChats(){
    this.chats=[];
    let url=''
    if(this.details.type=='team') url='user/teamchatMessages?thread_id='+this.details.thread
    if(this.details.type=='client') url='user/clientchatMessages?thread_id='+this.details.thread
    this.apiService.get(url).subscribe((res:any)=>{
      if(res['status']){
        this.chats=res['data'];
        this.chats.forEach((element:any,i:number) => {
          if(element.type==2){
           this.getAttachment(i)

          }
        });
        this.scrollBottom();
      }
    })
  }
  getAttachment(i:number){
    let down=''
    if(this.details.type=='team') down='user/teamchatAttachment/dowload?attachment_id='+this.chats[i].attachment_id
    if(this.details.type=='client') down='user/clientchatAttachment/dowload?attachment_id='+this.chats[i].attachment_id
    this.apiService.get(down).subscribe(res=>{
      if(res['status']==true){
        this.chats[i]['attachment']={path:res['data'],mimetype:res['mimetype']};
        setTimeout(() => {
          this.scrollBottom();
        }, 1000); 
      }
    })
  }
  messageSave(type:any=null){
    this.chatSubmit==true;
    console.log(this.logo)
    if(type==null && !this.formData.value.message) return;
    if(type==2 && this.logo==undefined) return;
      let data=new FormData();
      data.append('message',this.formData.value.message)
      data.append('type',type==null?'1':'2')
      data.append('thread_id',this.details.thread.toString())
      if(this.logo!=undefined)
      data.append('attachment_path',this.logo);
      let url=''
      if(this.details.type=='client'){
        url='user/clientchatMessages'
      }else url='user/teamchatMessages'
      this.apiService.postMultipart(url,data).subscribe(res=>{
        if(res['status']==true){
          this.logo=undefined;
          this.formData.reset();this.chatSubmit=false;
          this.chats.push(res['chatMessageData']);
          if(type==2)
          this.getAttachment(this.chats.length-1)
         this.scrollBottom();
        }
      })
   
  }
 
  get form() {
    return this.formData.controls;
  }
  onFileSelectedtrigger(event:any) {
    let type=event.target.files[0].type
    if(type == "application/vnd.ms-excel" ||
        type == "application/excel" ||
        type == "application/x-msexcel" ||
        type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||
        type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'||
        type=='application/pdf'|| type=='image/png' || type=='image/jpg' || type=='image/jpeg'){
      this.imageType=true;
     }else{
      this.imageType=false;
      this.eventService.broadcast('error', {page:'chat',message:'Invalid File'});
      // this.notification.error('Failed', 'File format not supported!', {
      //   nzPlacement: 'bottomRight',
      // })
      // Swal.fire('Error!', 'Invalid File ', 'error');
      return;
   }if( event.target.files[0].size>2000000){
     this.sizeError=true;
     this.eventService.broadcast('error', {page:'chat',message:'File size cannot exceed 2 MB!'});
      //  this.notification.error('Failed', 'File size cannot exceed 2 MB!', {
      //       nzPlacement: 'bottomRight',
      //     })
    //  Swal.fire('Error!', 'File size cannot exceed 2 MB', 'error');
     return;
   }else{
     this.sizeError=false;
   }
  this.logo=event.target.files[0];
  this.messageSave(2); 
   }
  //  enterMessage(event:any){
  //   if(event.key=='Enter')
  //   this.messageSave();
  //  }
   scrollBottom(){
    setTimeout(() => {
      this.scroll.nativeElement.scrollTo(0,this.scroll.nativeElement.scrollHeight)
 
    }, 100);
   }
   getType(mime:string){
    // console.log(url);
    if (mime !== undefined) {
      // url=url.replace("?alt=media", "");
      // let mime=url.substring(url.lastIndexOf('.')+1).toLowerCase()
      if(mime=='image/png' || mime=='image/jpg'|| mime=='image/jpeg')
      return true;
      else return false;
    }
    return false;
  }
  toggleEmojiPicker() {
         this.showEmojiPicker = !this.showEmojiPicker;
   }
   addEmoji(event:any) {
     this.formData.patchValue({
      message:this.formData.value.message+event.emoji.native
     })
  
   }
}
