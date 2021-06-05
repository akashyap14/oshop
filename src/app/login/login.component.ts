import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import firebase from 'firebase/app';
//import "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  provider = new firebase.auth.GoogleAuthProvider();

  constructor(public afAuth: AngularFireAuth) { }

  login(){
    this.afAuth.signInWithRedirect(this.provider);  
  } 

}
