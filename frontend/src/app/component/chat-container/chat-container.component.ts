import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { IChatRoom, IMessage } from 'src/app/models';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public rooms$: Observable<Array<IChatRoom>>;
  public messages$: Observable<Array<IMessage>>;

  constructor(
    private chatService: ChatService,
    private activateRoute: ActivatedRoute,
    router: Router
  ) {
    this.rooms$ = this.chatService.getRooms();
    console.log(activateRoute.snapshot.queryParams['id']);

    const roomId: string = activateRoute.snapshot.queryParams['id'];
    this.messages$ = this.chatService.getRoomsMessage(roomId);
    console.log('roomId', roomId);

    this.subscription.add(
      router.events
        .pipe(filter((data) => data instanceof NavigationEnd))
        .subscribe((data) => {
          const routerEvent: RouterEvent = <RouterEvent>data;          
          const urlArr = routerEvent.url.split('=');
          if (urlArr.length >= 2)
          console.log('urlArr[1]',urlArr[1]);
          
            this.messages$ = this.chatService.getRoomsMessage(urlArr[1]);

        })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {}
}
