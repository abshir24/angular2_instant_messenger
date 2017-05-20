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
    //the problem is here!
    // this.newMessage.Sender = this._chatService.loggedUser.Name
    // console.log("sender", this.newMessage.Sender)
    this._chatService.sendMessage(this.newMessage);
    this.newMessage = {};
  }

  ngOnInit() {
    this.connection = this._chatService.getMessages().subscribe(message => {
      console.log("message", message)
      this.messages.push(message);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}