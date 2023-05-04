import React from 'react';

import {CustomErrorPage} from '../src/pages/error/main';


const Custom404 = React.memo(() => {
  return <CustomErrorPage statusCode={404} title="找不到頁面"/>;
});

Custom404.displayName = 'Custom404';

export default Custom404;
