import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as BlogActions from '../actions/blog';
import LoadingIndicator from '../components/LoadingIndicator';
import BlogPostComponent from '../components/BlogPostComponent';

class BlogPost extends Component {

  static readyOnActions(dispatch, location, params) {
    return [
      () => dispatch(BlogActions.fetchBlogIfNeeded())
    ];
  }

  componentWillMount() {
    const { dispatch, location, params } = this.props;

    BlogPost.readyOnActions(dispatch, location, params)
      .forEach(action => action());
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  renderBlogPost (blogPostProps) {
    if (this.props.blog.readyState === BlogActions.GALLERIES_INVALID ||
      this.props.blog.readyState === BlogActions.GALLERIES_FETCHING) {
      return <LoadingIndicator />;
    }

    if (blog.readyState === BlogActions.BLOG_FETCH_FAILED)
      return <ErrorPage type='this blog post' />

    return <BlogPostComponent {...blogPostProps} />
  }

  render() {
    const blogPostProps = this.props.blog.blogPosts.find((posting) => {
      return posting.uid === this.props.routeParams.slug;
    });
    return (
      <div>
        <Helmet title={`${blogPostProps.data.blog.lede.value}`} />
        {this.renderBlogPost(blogPostProps.data.blog)}
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

export default connect(mapStateToProps)(BlogPost);
