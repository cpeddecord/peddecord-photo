import React from 'react';
import { Redirect } from 'react-router';

const redirects = [
  { from: '/wp-content/*', to: '/404' },
  { from:'/derp', to: '/about' }
];

export default redirects.map((rdrObj, i) => {
  return(
    <Redirect key={i} from={rdrObj.from} to={rdrObj.to} />
  );
});
