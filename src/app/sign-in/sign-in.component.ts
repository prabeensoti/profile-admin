import {Component, OnInit} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  loginForm : FormGroup;
  loading: boolean = false;
  hasError: boolean = false;
  isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
  }
}
