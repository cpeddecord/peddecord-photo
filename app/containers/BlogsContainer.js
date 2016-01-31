import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as BlogActions from '../actions/blog';

import LoadingIndicator from '../components/LoadingIndicator';
import GalleryCard from '../components/GalleryCard';

class Blog extends Component {

  static readyOnActions(dispatch, location, params) {
    return [
      () => dispatch(BlogActions.fetchBlogIfNeeded())
    ];
  }

  componentWillMount() {
    const { dispatch, location, params } = this.props;

    Blog.readyOnActions(dispatch, location, params)
      .forEach(action => action());
  }

  renderBlogs() {
    const { blog } = this.props;

    if (blog.readyState === BlogActions.BLOG_INVALID ||
      blog.readyState === BlogActions.BLOG_FETCHING) {
      return <LoadingIndicator />;
    }

    if (blog.readyState === BlogActions.BLOG_FETCH_FAILED)
      return <ErrorPage type='blog posts' />


    return (
      <div className='row'>
        {blog.blogPosts
          .sort((left, right) => {
            return new Date(left.data.blog.publishDate.value) < new Date(right.data.blog.publishDate.value)
          })
          .map((blogPost, i) => {
            const featuredImageProps = blogPost.data.blog.featuredImage.value.views.square;

            const progProps = {
              url: featuredImageProps.url,
              description: featuredImageProps.alt,
              dimensions: featuredImageProps.dimensions,
            };

            const cardProps = {
              lede: blogPost.data.blog.lede.value,
              shortLede: blogPost.data.blog.shortLede.value,
              galleryType: 'blog',
              featuredImage: progProps,
              slug: blogPost.uid,
              halfSize: false
            };

            return <GalleryCard key={i} {...cardProps} />
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title='Blog' />
        {this.renderBlogs()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    blog: state.blog,
    error: state.error || null
  };
}

export default connect(mapStateToProps)(Blog);
