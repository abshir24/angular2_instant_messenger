import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from "app/chat/chat.service";
import { UserCreateComponent } from 'app/chat/user-create/user-create.component';
import { ChatRoomComponent } from "app/chat/chat-room/chat-room.component";



@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatRoomComponent,
    UserCreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
