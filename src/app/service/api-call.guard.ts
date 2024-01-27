import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, tap} from "rxjs";

@Injectable()
export class ApiCallGuard implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if (request.url.includes('blogs')){
       let token=null
        // Check if the user is authenticated or implement your custom logic
        if (this.authService.isLoggedIn() && (token = this.authService.getTokenId())!=null) {
          // Modify the request headers or perform any other pre-request logic
          const modifiedRequest = request.clone({
            setHeaders: {
              Authorization: token,
              'Content-Type': 'application/json'
            },
          });
          return next.handle(modifiedRequest);
        } else {
          // Redirect to the login page or handle unauthenticated request
          // For example, you can throw an error, log the user out, or redirect to a login page
          // For simplicity, we'll throw an error in this example
          throw new Error('Unauthorized API call. User is not authenticated.');
        }
     }
    return next.handle(request);
  }

}
