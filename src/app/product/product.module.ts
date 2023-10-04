import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProductRoutingModule } from './product-routing.module'; // Import the routing module
import { StoreModule } from '@ngrx/store';
import { productReducer } from '../store/reducers/product.reducer'; // Import your product reducer


@NgModule({
  declarations: [ProductListComponent, AddEditProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxModule,
    DropdownModule,
    ProductRoutingModule,
    ButtonModule,
    StoreModule.forFeature('product', productReducer),
  ],
  providers: [],
})
export class ProductModule {}
