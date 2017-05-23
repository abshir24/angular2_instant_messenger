import { Component, OnInit,OnDestroy } from '@angular/core';
import { ChatService } from "app/chat/chat.service";

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  providers: [ChatService]
})
export class ChatComponent{
  constructor(private _chatService:ChatService) {}

  ngOnInit() {
     
  }
}