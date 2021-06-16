import { ReactiveComponent } from './reactive/reactive.component';
import { FormComponent } from './form/form.component';
import { CowinComponent } from './cowin/cowin.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: CowinComponent},
  {path: 'cowin', component: CowinComponent},
  {path: 'form', component: FormComponent},
  {path: 'react', component: ReactiveComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
