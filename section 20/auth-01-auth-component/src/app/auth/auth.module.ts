import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(
      [{path: '', component: AuthComponent}]
    )
  ]
})
export class AuthModule {

}
