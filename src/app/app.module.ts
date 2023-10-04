import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';

@NgModule({
  declarations: [AppComponent], // Include your root component
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}), // Initialize the root store with an empty state
    EffectsModule.forRoot([ProductEffects]), // Register your effects
    DynamicDialogModule,
  ],
  providers: [DialogService],
  bootstrap: [AppComponent], // Specify the root component
})
export class AppModule {}
