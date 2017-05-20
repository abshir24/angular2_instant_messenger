import { Component, OnInit } from '@angular/core';
import { ChatService } from "app/chat/chat.service";
import { User } from "app/chat/user-create/user";


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  newUser: User = new User();
  constructor(private _chatService:ChatService) { }

  ngOnInit() {
  }

  find(){
    console.log("Inside component")
    this._chatService.find(this.newUser)
    this.newUser = new User()
  }   
}

