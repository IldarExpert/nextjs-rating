import React from 'react';
import {withLayout} from '../layout/layout';
import Error404Page from '../page-components/error-404-page/error-404-page';

export const Error404 = (): JSX.Element => {
  return (
    <Error404Page/>
  );
};

export default withLayout(Error404);
