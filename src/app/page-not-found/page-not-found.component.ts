import {Component, OnInit, signal} from '@angular/core';
import {NgIf} from "@angular/common";
import {CognitoService} from "../service/cognito.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit{
  loggedIn: boolean = false;

  constructor(private cognitoService: CognitoService, private authService: AuthService) {
  }
  goToBlog(){
    if(!this.authService.isLoggedIn()){
      this.cognitoService.signIn();
    }
    this.loggedIn = true;
    this.authService.redirectToAnotherPage("/blogs")
  }

  goToLogIn(){
    if(!this.authService.isLoggedIn()){
      this.cognitoService.signIn();
    }
    this.loggedIn = true;
  }

  goToLogOut(){
    this.authService.loggedOut();
    this.loggedIn = false;
    this.cognitoService.signOut();
  }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
  }

}
