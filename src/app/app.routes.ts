import { Routes } from '@angular/router';
import {BlogsComponent} from "./blogs/blogs.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RedirectComponent} from "./ridirect/redirect.component";
import {AuthGuard} from "./service/auth.guard";

export const routes: Routes = [
  { path:'blogs', component:BlogsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path:'redirect', component:RedirectComponent, pathMatch: 'full' },
  { path:'', component:PageNotFoundComponent, pathMatch: 'full' },
  { path:'**', redirectTo: '' }
];
