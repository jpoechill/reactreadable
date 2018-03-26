import React from 'react';
import PropTypes from 'prop-types';
import { makeDelete } from '../utils/api';
import { connect } from 'react-redux'

export class EditPost extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit = (e) => {
    var self = this
    var currCategory = this.props.currentCategory
    var postID = this.props.thisPost.id
    var commentID = this.props.match.params.commentid
    var deleteType = 'comments'

    e.preventDefault();
    makeDelete(deleteType, commentID).then((result) => {
      self.context.router.history.push('/' + currCategory + '/' + postID);
    });
  }

  render() {
    return (<div id="header-spacer">
      <div className="new-post-header">
        Delete Comment
      </div>
      <div id="delete-comment">
        <form onSubmit={this.handleSubmit}>
          <p>Are you sure you want to delete?</p>
          <input type="button" value="Cancel"></input>
          <input type="submit" value="Delete"></input>
        </form>
      </div>
    </div>);
  }
}


function mapStateToProps (state) {
  console.log(state)
  return {
    currentCategory: state.categoriesState.currentCategory,
    thisPost: state.postsDetailState.thisPost,
    comments: state.postsDetailState.comments,
  }
}

export default connect(mapStateToProps)(EditPost)
