import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IChatRoom, IMessage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private _db: AngularFirestore) {}

  getRooms(): Observable<Array<IChatRoom>> {
    return this._db
      .collection('rooms')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snaps) => {
            const id = snaps.payload.doc.id;
            const data: IChatRoom = <IChatRoom>snaps.payload.doc.data();
            return <IChatRoom>{
              ...data,
              id,
            };
          });
        })
      );
  }
  getRoomsMessage(roomId: string): Observable<Array<IMessage>> {
    return this._db
      .collection('rooms')
      .doc(roomId)
      .collection('message')
      .snapshotChanges()
      .pipe(
        map((messages) => {
          return messages.map((message) => {
            const data: IMessage = <IMessage>message.payload.doc.data();
            const id = message.payload.doc.id;
            return {
              ...data,
              id,
            };
          });
        })
      );
  }

  addRoom(roomName:string,userId:string|undefined):void{
    this._db.collection('rooms').add({
      roomName,
      createdUserId:userId,
    })
  }

  public sendMessage(userId:string,body:string,roomId:string){
    console.log('message3',userId , roomId,body);
    this._db.collection('rooms').doc(roomId).collection('message').add({
      body,
      userId,
      timestamp: new Date().getTime(),
    });
  }

}
