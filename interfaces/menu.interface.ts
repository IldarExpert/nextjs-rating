import {TopLevelCategory} from './page.interface';

export interface PageItem {
    alias: string;
    title: string;
    _id: string;
    category: string;
  }

  export interface MenuItem {
    _id: {
      secondCategory: string;
    };
    pages: PageItem[];
    isOpen?: boolean;
  }

  export interface FirstLevelMenuItem {
    icon: JSX.Element;
    id: TopLevelCategory;
    name: string;
    route: string;
  }
