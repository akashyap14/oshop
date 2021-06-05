import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
//import {AngularFireAuth} from '@angular/fire/auth';
//import {Observable} from 'rxjs';
//import firebase from 'firebase/app';
//import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //user$ : Observable<firebase.User>;

  constructor(private auth : AuthService, private router : Router) { 
    //this.user$ = afAuth.authState; 
  }

  canActivate(route ,state : RouterStateSnapshot){
    return this.auth.user$.pipe(map(user => {
      if(user) return true;

      this.router.navigate(['/login'], { queryParams : { returnUrl : state.url}});
      return false;
    }))

  }
}
