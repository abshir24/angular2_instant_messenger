import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Http,Response,RequestOptions,Headers } from "@angular/http";
import "rxjs";
import { User } from "app/chat/user-create/user";
import { Message } from "app/chat/chat-room/message";

@Injectable()
export class ChatService {
  private url = 'http://localhost:5000';  
  private socket;
  user:User;
  loggedUser: any;
  USERS: User[] = []
  loggedin = false
  message:any;
  condition: boolean = true
  // MESSAGES: Message[] = []

  constructor(private http:Http) {}
  
  getUser(){
    this.socket.emit('logged-user',this.loggedUser.Name)
  }
  
  sendMessage(message:any){
      this.socket.emit('add-message',message)
  }
    
  getMessages(){
    console.log("entering get messages")
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () =>{
        this.socket.disconnect();
      };  
    })
    console.log("message", observable)     
    return observable;
  }
  
  get_users(){
    this.http.get('/users')
      .map((response: Response) => response.json())
      .subscribe(
      data => {this.USERS=data},
      (e) => {console.log(e)},
      () => {console.log("Continue?")}
      )
  }

  loggedIn(){
    this.http.get('/loggedin')
      .map((response: Response) => response.json())
      .subscribe(user=>{if(user){{this.loggedin = true; this.loggedUser=user}}else{this.loggedin = false}},
      )
    }

    create(user:User){
      const headers = new Headers({"Content-Type": "application/json"})
      const options = new RequestOptions({headers: headers})
      this.http.post("/create", user,options)
        .map((response: Response)=> response.json())
        .subscribe(userinfo =>{console.log("Server returned this userinfo.body: ",userinfo);
          this.loggedUser = userinfo;
          this.loggedin = true
        })
    }

    find(user:User){
      console.log("inside service")
      const headers = new Headers({"Content-Type": "application/json"})
      const options = new RequestOptions({headers: headers})
      this.http.post("/find", user,options)
          .map((response: Response) => response.json())
          .subscribe(data2 =>{
            if(data2==null){
              console.log("User was not found"); 
              this.create(user);
            }else{ 
              console.log("User was found: ", data2);
              this.loggedUser = data2
              console.log("loggeduser", this.loggedUser.Name)
              this.loggedin = true
          }
        })
    }

    logOut(){
      console.log("hitting logout service")
      this.http.get("/logout")
          .map((response: Response) => response.json())
          .subscribe()
          this.loggedin = false  
    }
}