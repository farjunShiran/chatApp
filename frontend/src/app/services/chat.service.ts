import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IChatRoom } from '../models';

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
              id
            };
          });
        })
      );
  }
}
