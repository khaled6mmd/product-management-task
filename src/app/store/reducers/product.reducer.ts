import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as ProductActions from '../actions/product.actions';
import { Product } from 'src/app/product/models/product.model';

export interface ProductState extends EntityState<Product> {
  // Define additional state properties here if needed
}

const adapter = createEntityAdapter<Product>({
  selectId: (entity: Product) => entity.id // Assuming you have an 'id' property
});
const initialState: ProductState = adapter.getInitialState({
  // Define initial state properties here if needed
});

export const productReducer = createReducer(
  initialState,

  on(ProductActions.addProduct, (state, { product }) => {
    const newId = state.ids.length + 1;
    const productWithNewId: Product = { ...product, id: newId };
    return adapter.addOne(productWithNewId, state);
  }),
  on(ProductActions.updateProduct, (state, { product }) => adapter.updateOne({ id: product.id, changes: product }, state)),
  on(ProductActions.productsLoaded, (state, { products }) => adapter.setAll(products, state))
);

export const { selectAll: selectAllProducts } = adapter.getSelectors();