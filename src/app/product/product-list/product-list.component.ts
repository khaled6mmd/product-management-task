import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { loadProducts } from '../../store/actions/product.actions';
import { selectProducts } from '../../store/selectors/product.selectors';
import { ProductState } from '../../store/reducers/product.reducer';
import { filter } from 'rxjs/operators';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [DynamicDialogRef, DynamicDialogConfig ]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private store: Store<{ product: ProductState }>,
    public dialogService: DialogService
  ) {
    this.products$ = this.store.select(selectProducts).pipe(
      filter((products) => !!products)
    ) as Observable<Product[]>;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(loadProducts());
  }

  updateProduct(productId: number): void {
    const ref = this.dialogService.open(AddEditProductComponent, {
      header: 'Update Product',
      width: '500px',
      data: { productId },
    });
  }

  addProduct(): void {
    const ref = this.dialogService.open(AddEditProductComponent, {
      header: 'Add Product',
      width: '500px',
    });
  }
}
