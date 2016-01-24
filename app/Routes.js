import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import NoMatch from './containers/NoMatch';
import Galleries from './containers/Galleries';
import Gallery from './containers/Gallery';
import LoadingIndicator from './components/LoadingIndicator';
import SimplePage from './components/SimplePage';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Galleries} />
    <Route path='/work/:slug' component={Gallery} />
    <Route path='/portfolio/:slug' component={Gallery} />
    <Route path='/series/:slug' component={Gallery} />

    <Route path='/loading' component={LoadingIndicator} />

    <Route path='/about' component={SimplePage} />
    <Route path="*" component={NoMatch} />
  </Route>
);
