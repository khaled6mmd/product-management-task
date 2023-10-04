import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { selectProductById } from '../../store/selectors/product.selectors';
import { ProductState } from 'src/app/store/reducers/product.reducer';
import { Product } from '../models/product.model';
import { Subscription } from 'rxjs';
import * as ProductActions from '../../store/actions/product.actions';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  productId: number | null = null;
  categories: string[] = [];
  isSubmitting = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private store: Store<{ product: ProductState }>,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.config.data?.productId) {
      this.productId = this.config.data.productId;
      this.fillFormWithProductData();
    }

    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  private initializeForm(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      purchaseDate: [''],
      price: ['', [Validators.required]],
      count: [''],
      image: ['', [this.validateImageUrl]],
      readyForSell: [],
      description: [''],
    });
  }

  private fillFormWithProductData(): void {
    if (this.productId !== null) {
      const productSubscription = this.store
        .select(selectProductById(this.productId))
        .subscribe((product: Product | undefined) => {
          if (product) {
            this.productForm.patchValue(product);
          }
        });
      this.subscriptions.push(productSubscription);
    }
  }

  private loadCategories(): void {
    const categoriesSubscription = this.productService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.subscriptions.push(categoriesSubscription);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      let updateSubscription: Subscription;

      if (this.productId) {
        const updatedProduct = this.productForm.value;
        updateSubscription = this.productService
          .updateProduct(this.productId, updatedProduct)
          .subscribe((product) => {
            this.handleUpdateProductSuccess(product, updatedProduct);
          });
      } else {
        const newProduct = this.productForm.value;
        updateSubscription = this.productService
          .addProduct(newProduct)
          .subscribe((product) => {
            this.handleAddProductSuccess(product, newProduct);
          });
      }
      this.subscriptions.push(updateSubscription);
    }
  }

  private handleUpdateProductSuccess(product: Product, updatedProduct: any): void {
    this.store.dispatch(ProductActions.updateProduct({ product: { ...product, ...updatedProduct } }));
    this.isSubmitting = false;
    this.ref.close();
  }

  private handleAddProductSuccess(product: Product, newProduct: any): void {
    this.store.dispatch(ProductActions.addProduct({ product: newProduct }));
    this.isSubmitting = false;
    this.ref.close();
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  validateImageUrl(control: any): { [key: string]: any } | null {
    const value = control.value;
    if (value && !/^(http(s?):\/\/.+\.(jpg|jpeg|png|gif|bmp))$/.test(value)) {
      return { invalidImage: true };
    }
    return null;
  }
}
