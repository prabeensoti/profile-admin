import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private idTokenSubject: BehaviorSubject<string | null>;

  constructor(private router: Router) {
    this.idTokenSubject = new BehaviorSubject<string | null>(this.extractIdTokenFromUrl());
  }

  private extractIdTokenFromUrl(): string | null {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    return urlParams.get('id_token');
  }

  subscribeIdToken(): Observable<string | null> {
    return this.idTokenSubject.asObservable();
  }

  getTokenId(): string| null{
    return sessionStorage.getItem("ID_TOKEN") || localStorage.getItem("ID_TOKEN");
  }

  storeIdToken(idToken: string): void {
    sessionStorage.setItem("ID_TOKEN",idToken) ;
    localStorage.setItem("ID_TOKEN",idToken) ;
  }

  redirectToAnotherPage(uri: string): void {
    this.router.navigate([uri]).then();
  }

  isLoggedIn(): boolean{
    return sessionStorage.getItem("ID_TOKEN") != null || localStorage.getItem("ID_TOKEN") != null;
  }

  loggedOut():void{
    sessionStorage.removeItem("ID_TOKEN") ;
    localStorage.removeItem("ID_TOKEN") ;
  }
}
