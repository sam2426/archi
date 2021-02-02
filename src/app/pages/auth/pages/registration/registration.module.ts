import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { ButtonModule, FormFieldModule, InputModule, PasswordModule, SpinnerModule } from '@app/shared';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    ButtonModule,
    SpinnerModule
  ]
})
export class RegistrationModule { }
