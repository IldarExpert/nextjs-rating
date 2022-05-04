import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  color: 'grey' | 'ghost' | 'green' | 'red' | 'primary',
  size: 'S' | 'M',
  href?: string,
  children: ReactNode,
}
