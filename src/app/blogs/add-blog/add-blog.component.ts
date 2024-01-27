import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastService} from "../../service/toast.service";
import {NgClass} from "@angular/common";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {BlogModel} from "../../model/blog.model";
import {BlogService} from "../../service/blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgbInputDatepicker,
  ],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {
  blogForm: FormGroup;
  toastService: ToastService;
  months =['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  isSubmitted: boolean = false;
  tempImg: string = '';
  constructor(formBuilder: FormBuilder,
              toastService: ToastService,
              private blogService: BlogService) {
    this.blogForm = formBuilder.group({
      url: ['',[Validators.required]],
      title: ['',[Validators.required]],
      img: [undefined,[Validators.required]],
      postDate: ['', Validators.required],
    });
    this.toastService = toastService;
  }
  get formControls(): { [p: string]: AbstractControl } {
    return this.blogForm.controls;
  }
  saveBlog(): void{
    const formValue = this.blogForm.value;
    // const dates = formValue.postDate.split("-");
    const blog: BlogModel = {
      id: '',
      title: formValue.title,
      img: this.tempImg,
      url: formValue.url,
      year: formValue.postDate.year.toString(),
      month: this.months[formValue.postDate.month],
      day: formValue.postDate.day.toString(),
    };
    this.blogService.saveBlog(blog).subscribe({
      next: value => {
        location.reload();
        },
      error: err => {
        this.toastService.show("Something Went Wrong", { classname: 'bg-danger text-light fs-5', delay: 2000 });},
    });
  }

  getBase64(event: any): void {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let self = this;
    reader.onload = function (){
      self.tempImg = reader.result!=null ? reader.result.toString(): '';
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
