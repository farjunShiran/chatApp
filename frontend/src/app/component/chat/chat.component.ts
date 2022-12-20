import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMessage } from 'src/app/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() messages: Array<IMessage> = [];
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    console.log('MESSAGESSS!!', this.messages);
  }
  sendMessage(message:string):void{
    console.log('message1',message);
    
    this.onSendMessage.emit(message);
  }
}


