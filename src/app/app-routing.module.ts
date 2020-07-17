import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrontpageComponent} from './components/frontpage/frontpage.component';
import {TourViewComponent} from "./components/tour-view/tour-view.component";



const routes: Routes = [
//  {path: 'frontpage', component: FrontpageComponent},
//  {path: '', pathMatch: 'full', redirectTo: 'frontpage'}];
  {path: 'tour-view', component: TourViewComponent},
  {path: '', pathMatch: 'full', redirectTo: 'tour-view'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
