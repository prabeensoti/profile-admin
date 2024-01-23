import { Injectable } from '@angular/core';
import { Amplify} from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolClientId: 'string',
          userPoolId: 'string'
      }},
    });
  }
}
