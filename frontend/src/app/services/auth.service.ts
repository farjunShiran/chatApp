import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from '@firebase/util';
import * as firebase from 'firebase/compat/app';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isLogged$ = this._isLogged.asObservable();
  userData: any; // Save logged in user data
  private userDetails$:Subject<User> = new Subject<User>;

  constructor(
    private afs: AngularFirestore, // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service)
    private router: Router
  ) {
    const saveUserString = localStorage.getItem('user');
    if (saveUserString != null) {
      this._isLogged.next(true);
    }

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.userDetails$.next(<User>user)
        console.log(JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this._isLogged.next(true);
      } else {
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user')!);
        this._isLogged.next(false);
        // this.userDetails$.next(undefined)

      }
    });
  }

  signInWithGoogle(): Promise<void> | void {
    return this.authLogin(new firebase.default.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        this._isLogged.next(true);
        this.setUserData(res.user as User);
        this.router.navigate(['/chat']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  isLoggedIn() {
    return this._isLogged;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user?: User): Promise<void> | void {
    if (!user) return;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  signOut(): Promise<void> | void {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['./']);
    });
  }
}
