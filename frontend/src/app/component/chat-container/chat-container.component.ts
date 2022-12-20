import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { IChatRoom, IMessage } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { AddRoomComponent } from '../add-room/add-room.component';

@Component({
  selector: 'app-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private userId?: string = '';
  public rooms$: Observable<Array<IChatRoom>>;
  public messages$?: Observable<Array<IMessage>>;
  private roomId?: string;

  constructor(
    private chatService: ChatService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    router: Router,
    public dialog: MatDialog
  ) {
    this.rooms$ = this.chatService.getRooms();

    if (activateRoute.snapshot.url.length > 1) {
      this.roomId = activateRoute.snapshot.url[1].path;
      this.messages$ = this.chatService.getRoomsMessage(this.roomId);
    }

    this.subscription.add(
      router.events
        .pipe(filter((data) => data instanceof NavigationEnd))
        .subscribe((data) => {
          const routerEvent: RouterEvent = <RouterEvent>data;
          const urlArr = routerEvent.url.split('/');
          if (urlArr.length > 2)
            this.messages$ = this.chatService.getRoomsMessage(urlArr[2]);
        })
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService
        .getUserData()
        .pipe(filter((data) => !!data))
        .subscribe((user) => {
          // console.log('user',user);
          this.userId = user?.uid;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRoomComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.onAddRoom(result, this.userId);
    });
  }

  onAddRoom(roomName: string, userId: string | undefined) {
    this.chatService.addRoom(roomName, userId);
  }

  onSendMessage(message: string) {
    console.log('message2',this.userId , this.roomId,message);
    if (this.userId && this.roomId)
      this.chatService.sendMessage(this.userId, message, this.roomId);
  }
}
