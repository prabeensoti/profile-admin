import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastService} from "../../service/toast.service";
import {NgClass} from "@angular/common";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";

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

  isSubmitted: boolean = false;
  tempImg: string = '';
  constructor(formBuilder: FormBuilder, toastService: ToastService) {
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
    // const blog: BlogModel = {
    //   title: formValue.title,
    //   img: this.tempImg,
    //
    // };
    // this.blogService.saveProduct(blog)
    console.log(this.tempImg);
    // this.toastService.show("Error Message", { classname: 'bg-danger text-light fs-5', delay: 2000 });
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
