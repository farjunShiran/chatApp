import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContainerComponent } from './component/chat-container/chat-container.component';
import { ChatRoomListComponent } from './component/chat-room-list/chat-room-list.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes =  [

{
  path: '',
  component: HomeComponent,
},
{
  path: 'chat',
  component: ChatContainerComponent,
  canActivate:[ AuthGuardService]
},
{
  path: 'chat/:roomId',
  component: ChatContainerComponent,
  canActivate:[ AuthGuardService]
},
{
  path: '**',
  redirectTo: '',
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
