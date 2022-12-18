import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  // isLogin: boolean = false;
  public isLoggedIn$: Observable<boolean>;
  
  constructor(private auth: AuthService) {
    this.isLoggedIn$ = this.auth.isLoggedIn();   //because its in constructor its like i do initialize()
  }

  ngOnInit(): void {
    // this.subscription.add(
    //   this.auth.isLoggedIn().subscribe((data) => {
    //     console.log(data);
    //     this.isLogin = data;
    //   })
    // );
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle();
  }

  signOut() {
    this.auth.signOut();
  }
}
