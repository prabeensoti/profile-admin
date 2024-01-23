import { Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {BlogsComponent} from "./blogs/blogs.component";

export const routes: Routes = [
  { path:'login', component:SignInComponent, pathMatch: 'full' },
  { path:'blogs', component:BlogsComponent, pathMatch: 'full' },
  { path:'**', redirectTo:'blogs' }
];
