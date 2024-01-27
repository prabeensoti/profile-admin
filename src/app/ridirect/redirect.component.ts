import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  template: '',
  styles: ''
})
export class RedirectComponent {

  constructor(private authService: AuthService) {
    this.authService.subscribeIdToken().subscribe((idToken) => {
      if (idToken) {
        // Store the id_token for later use if needed
        this.authService.storeIdToken(idToken);
        // Redirect to another page
        this.authService.redirectToAnotherPage("/blogs");
      } else {
        // Handle the absence of id_token if needed
        this.authService.redirectToAnotherPage("/");
      }
    });
  }

}
