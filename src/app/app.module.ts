import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { AuthComponent } from './shared/component/auth/auth.component';
import { ProductDashComponent } from './shared/component/product/product-dash/product-dash.component';
import { ProductDetComponent } from './shared/component/product/product-det/product-det.component';
import { ProductFormComponent } from './shared/component/product/product-form/product-form.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './shared/component/home/home.component';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserDashComponent } from './shared/component/user/user-dash/user-dash.component';
import { FairDashComponent } from './shared/component/user/fair-dash/fair-dash.component';

@NgModule({
  declarations: [
    AppComponent,
    GetConfirmComponent,
    NavbarComponent,
    AuthComponent,
    ProductDashComponent,
    ProductDetComponent,
    ProductFormComponent,
    HomeComponent,
    PageNotFoundComponent,
    UserDashComponent,
    FairDashComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
