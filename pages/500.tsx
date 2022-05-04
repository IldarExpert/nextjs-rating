import React from 'react';
import {withLayout} from '../layout/layout';
import Error500Page from '../page-components/error-500-page/error-500-page';

export const Error500 = (): JSX.Element => {
  return (
    <Error500Page/>
  );
};

export default withLayout(Error500);
