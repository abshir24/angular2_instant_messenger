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
  // USERS: User[] = []
  loggedin = false
  message:any;
  // MESSAGES: Message[] = []

  constructor(private http:Http) {}

  currentUser(){
    this.http.get('/loggedin')
      .map((response: Response) => response.json())
      .subscribe(user=>{if(user){{this.loggedin = true; this.loggedUser=user; this.socket = io(this.url); this.socket.emit('current-user', this.loggedUser) }}else{this.loggedin = false}})
    
  }
  
  //Emits the message sent from the form
  sendMessage(message:any){
      //the problem is here!
      //if i put anything besides the emit function inside of this method then the socket will automatically disconnect.
      this.socket.emit('add-message',message)
  }
  
  //gets the last message that belongs to the the current user from the database
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
    return observable;
  }
  

  // get_users(){
  //   this.http.get('/users')
  //     .map((response: Response) => response.json())
  //     .subscribe(
  //     data => {this.USERS=data},
  //     (e) => {console.log(e)},
  //     () => {console.log("Continue?")}
  //     )
  // }
  

    //creates new user
    create(user:User){
      const headers = new Headers({"Content-Type": "application/json"})
      const options = new RequestOptions({headers: headers})
      this.http.post("/create", user,options)
        .map((response: Response)=> response.json())
        .subscribe(userinfo =>{this.loggedUser = userinfo; this.loggedin = true})
    }

    //checks to see if the user exists in db
    find(user:User){
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