import {ProductModel} from '../../interfaces/product.interface';
import {SortEnum} from '../../components/sort/sort.props';

export type SortAction = (
  { type: SortEnum.Price } |
  { type: SortEnum.Rating } |
  { type: SortEnum.Reset, payload: ProductModel[]}
  );

export interface SortReducerState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortAction): SortReducerState => {
  switch (action.type) {
    case SortEnum.Price:
      return {
        ...state,
        sort: SortEnum.Price,
        products: state
          .products
          .sort((a, b) => a.price - b.price)
      };
    case SortEnum.Rating:
      return {
        ...state,
        sort: SortEnum.Rating,
        products: state
          .products
          .sort((a, b) => a.initialRating - b.initialRating)
      };
    case SortEnum.Reset:
      return {
        ...state,
        sort: SortEnum.Reset,
        products: action.payload,
      };
    default:
      throw new Error('Неверный тип сортировки');
  }
};
