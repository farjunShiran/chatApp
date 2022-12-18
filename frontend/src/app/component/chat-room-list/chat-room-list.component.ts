import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.scss']
})
export class ChatRoomListComponent implements OnInit {

  @Input() rooms:any;
  constructor() { }

  ngOnInit(): void {
  }

}
