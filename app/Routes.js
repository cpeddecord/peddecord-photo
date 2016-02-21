import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/App';
import NoMatch from './containers/NoMatch';
import Galleries from './containers/Galleries';
import Gallery from './containers/Gallery';
import BlogsContainer from './containers/BlogsContainer';
import BlogPost from './containers/BlogPost';
import LoadingIndicator from './components/LoadingIndicator';
import AboutPage from './components/AboutPage';

import redirects from './utils/redirects';

const galleryNames = ['work', 'portfolio', 'series'];
const galleriesWithSlugs = galleryNames
  .map((gall, i) => {
    return <Route key={i} path={`/${gall}`} component={Galleries} />
  })
  .concat(galleryNames.map((gall, i) => {
    return <Route key={i + 3} path={`/${gall}/:slug`} component={Gallery} />
  }));


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Galleries} />

    {galleriesWithSlugs}

    <Route path='/blog' component={BlogsContainer} />
    <Route path='/blog/:slug' component={BlogPost} />

    <Route path='/about' component={AboutPage} />
    <Route path='/404' component={NoMatch} />

    {redirects}

    <Route path="*" component={NoMatch} />
  </Route>
);
