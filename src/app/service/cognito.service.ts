import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private cognitoHostedUIUrl = 'https://prabeensoti.auth.us-east-1.amazoncognito.com';


  constructor() {
  }

  signIn(){
    const queryParams = {
      client_id: '13gl4c5ds4p980hb5fli3e19ql',
      response_type: 'token',
      scope: 'aws.cognito.signin.user.admin+email+openid+phone+profile',
      redirect_uri: encodeURIComponent('http://localhost:4200/redirect'),
    };

    const cognitoUrlWithParams = `${this.cognitoHostedUIUrl}/oauth2/authorize?${this.buildQueryParams(queryParams)}`;
    window.location.href = cognitoUrlWithParams;
  }

  signOut(){
    const queryParams = {
      client_id: '13gl4c5ds4p980hb5fli3e19ql',
      response_type: 'token',
      scope: 'aws.cognito.signin.user.admin+email+openid+phone+profile',
      logout_uri: encodeURIComponent('http://localhost:4200'),
      redirect_uri: encodeURIComponent('http://localhost:4200/redirect'),
    };

    const cognitoUrlWithParams = `${this.cognitoHostedUIUrl}/logout?${this.buildQueryParams(queryParams)}`;
    // console.log(cognitoUrlWithParams);
    window.location.href = cognitoUrlWithParams;
  }

  private buildQueryParams(params: { [key: string]: string }): string {
    return Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
  }
}
