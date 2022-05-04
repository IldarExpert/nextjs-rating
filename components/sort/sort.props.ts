import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  sort: SortEnum,
  setSort: (sortType: SortEnum.Price | SortEnum.Rating) => void
}

export enum SortEnum {
  Rating,
  Price,
  Reset,
}
