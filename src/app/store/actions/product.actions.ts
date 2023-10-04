import { createAction, props } from '@ngrx/store';
import { Product } from '../../product/models/product.model'; // Adjust the import path

export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>());
export const updateProduct = createAction('[Product] Update Product', props<{ product: Product }>());
export const loadProducts = createAction('[Product] Load Products');
export const productsLoaded = createAction('[Product] Products Loaded', props<{ products: Product[] }>());
