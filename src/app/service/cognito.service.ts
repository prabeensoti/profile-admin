import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private cognitoHostedUIUrl = 'https://admin-prabeensoti.auth.us-east-1.amazoncognito.com';


  constructor() {
  }

  signIn(){
    const queryParams = {
      client_id: '7ci7o6g5kkfk6ms09mmu19g3hc',
      response_type: 'token',
      scope: 'aws.cognito.signin.user.admin+email+openid+phone+profile',
      redirect_uri: encodeURIComponent('http://localhost:4200/redirect'),
    };

    const cognitoUrlWithParams = `${this.cognitoHostedUIUrl}/oauth2/authorize?${this.buildQueryParams(queryParams)}`;
    window.location.href = cognitoUrlWithParams;
  }

  signOut(){
    const queryParams = {
      client_id: '7ci7o6g5kkfk6ms09mmu19g3hc',
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
