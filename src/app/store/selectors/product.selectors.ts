import { createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';

// Assuming you have an entities object in your state
const selectProductState = (state: { product: ProductState }) => state.product;

export const selectProducts = createSelector(
  selectProductState,
  (state) => (state && state.entities ? Object.values(state.entities) : [])
);

// Create a selector to fetch a product by its id
export const selectProductById = (productId: number) =>
  createSelector(selectProductState, (state) => state.entities[productId]);
