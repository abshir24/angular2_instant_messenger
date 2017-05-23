import { Component, OnInit,OnDestroy } from '@angular/core';
import {ChatService}from '../chat.service';
import { Message } from "app/chat/chat-room/message";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  providers: [ChatService],
  //  template: `<div *ngFor="let message of messages">
  //                    {{message.text}}
  //                  </div>
  //                  <input [(ngModel)]="message"  /><button (click)="sendMessage()">Send</button>`,
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  connection;
  messages = [];
  message;
  newMessage: any = {};
  
  constructor(private _chatService:ChatService) {}


  sendMessageComp(){
    // this.newMessage.Sender = this._chatService.loggedUser.Name
    // console.log("sender", this.newMessage.Sender)
    this._chatService.sendMessage(this.newMessage);
    this.newMessage = {};
  }

  ngOnInit() {
    this.connection = this._chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
    this._chatService.currentUser()
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}