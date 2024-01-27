import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BlogModel} from "../model/blog.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  API_ENDPOINT: string = "https://mt4942ktyj.execute-api.us-east-1.amazonaws.com/v1";


  constructor(private http: HttpClient) {
  }

  public saveBlog(blog: BlogModel): Observable<any>{
    return this.http.post<BlogModel>(this.API_ENDPOINT+"/blogs", blog);
  }

  public getAllBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(this.API_ENDPOINT+"/blogs");
  }

  public deletePage(id: string): Observable<any>{
    return this.http.delete(this.API_ENDPOINT+"/blogs/"+id);
  }
}
