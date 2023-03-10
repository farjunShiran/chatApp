import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { outputAst } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IMessage } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll?: CdkVirtualScrollViewport;
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();
  @Input() set messages(messages: Array<IMessage>) {
    this._messages = messages.sort((x, y) => {
      return x.timestamp - y.timestamp;
    });
    setTimeout(() => {
      this.virtualScroll?.scrollToIndex(this._messages.length - 1);
    }, 0);
  }
  get messages(): IMessage[] {
    return this._messages;
  }
  private _messages: Array<IMessage> = [];
  public userId: string;
  constructor(private authService: AuthService) {
    this.userId = authService.getUserId();
  }

  ngOnInit(): void {
    console.log('MESSAGESSS!!', this.userId, this.messages);
  }
  sendMessage(message: string, input: HTMLInputElement): void {
    this.onSendMessage.emit(message);
    input.value = '';
  }
}
