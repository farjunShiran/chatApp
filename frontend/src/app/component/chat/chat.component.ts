import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMessage } from 'src/app/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();
  @Input() set messages(messages: Array<IMessage>) {
    this._messages = messages.sort((x, y) => {
      return x.timestamp - y.timestamp;
    });
  }
  get messages(): IMessage[] {
    return this._messages;
  }
  private _messages: Array<IMessage> = [];

  constructor() {}

  ngOnInit(): void {
    console.log('MESSAGESSS!!', this.messages);
  }
  sendMessage(message: string, input: HTMLInputElement): void {
    this.onSendMessage.emit(message);
    input.value = '';
  }
}
