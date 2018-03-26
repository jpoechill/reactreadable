import React from 'react';
import PropTypes from 'prop-types';
import { makeDelete } from '../utils/api';

export default class EditPost extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit = (e) => {
    var self = this;
    var postID = this.props.match.params.postid
    var deleteType = 'posts'

    e.preventDefault();
    makeDelete(deleteType, postID).then(() => {
      self.context.router.history.push('/');
    });
  }

  render() {
    return (<div id="header-spacer">
      <div className="new-post-header">
        Delete Post
      </div>
      <div id="new-post">
        <form onSubmit={this.handleSubmit}>
          <p>Are you sure you want to delete?</p>
          <input type="button" value="Cancel"></input>
          <input type="submit" value="Delete"></input>
        </form>
      </div>
    </div>);
  }
}
