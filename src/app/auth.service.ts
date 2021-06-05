import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase  from 'firebase/app';
import {Observable} from 'rxjs';
import "firebase/auth";
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;
  provider = new firebase.auth.GoogleAuthProvider();

  constructor(
    private userService : UserService,
    public afAuth : AngularFireAuth,
    private route : ActivatedRoute, 
    private router : Router) {
    this.user$ = afAuth.authState;

   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(this.provider);
  }

  

  logout(){
    this.afAuth.signOut()
      .then(()=> {
        this.router.navigate(['/']);
      })
  }

  get appUser$() : Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => this.userService.get(user.uid).valueChanges()))
  }
}
