import { Component } from '@angular/core';
import {BlogModel} from "../model/blog.model";
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddBlogComponent} from "./add-blog/add-blog.component";
import {BlogService} from "../service/blog.service";
import {ToastService} from "../service/toast.service";
import {AuthService} from "../service/auth.service";
import {CognitoService} from "../service/cognito.service";

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  isLoading: boolean = false;

  blogs!: BlogModel[];
  constructor(private modelService: NgbModal,
              private blogService: BlogService,
              private toastService: ToastService,
              private authService: AuthService,
              private cognitoService: CognitoService) {
    this.fetchAllBlogs();
  }
  addBlog() {
    this.modelService.open(AddBlogComponent, {size:"lg"});
  }
  fetchAllBlogs(){
    this.isLoading = true;
    this.blogService.getAllBlogs().subscribe({
      next: (res) => {
        this.blogs=res;
      },
      error: (err) => {
        if(err.error != undefined && err.status != undefined)
          this.toastService.show(err.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
          if(err.status === 401){
            this.authService.loggedOut();
            location.reload();
          }
        else
          this.toastService.show("Server Error", { classname: 'bg-danger text-light fs-5', delay: 2000 });

        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  deleteBlog(id: string){
    this.isLoading = true;
    this.blogService.deletePage(id).subscribe({
      error: (err) => {
        this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
        this.isLoading = false;
      },
      complete: () =>{
        this.isLoading = false;
        this.toastService.show("Successfully Deleted!", { classname: 'bg-success text-light fs-5', delay: 2000 });
        this.blogs = this.blogs.filter(blog => blog.id !== id);
      }
    });
  }

  logOut() {
    this.authService.loggedOut();
    this.cognitoService.signOut();
  }
}
