import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontTemplateComponent } from './front-template/front-template.component';

const routes: Routes = [
  { path: '', component: FrontTemplateComponent},
  { path: 'train/:trainID', component: FrontTemplateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
