import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchPostsDetails } from '../actions'
import { getCommentInfo, editComment } from '../utils/api'

export class EditComment extends React.Component {
  state = {
    postTitle: '',
    postBody: ''
  }

  static propTypes = {
    parentID: PropTypes.string,
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit = (e) => {
    var self = this
    var commentID = this.props.match.params.commentid
    var currCategory = this.props.currentCategory
    var parentID = this.props.parentID
    console.log("Hello")
    console.log(parentID)
    var data = {
      timestamp: Date.now(),
      body: this.state.postBody
    }

    e.preventDefault();
    editComment(commentID, data).then(() => {
       self.context.router.history.push('/' + currCategory + '/' + parentID);
    });
  }

  changeBody = (e) => {
    this.setState({postBody: e.target.value});
  }

  componentDidMount() {
    var self = this
    var commentID = this.props.match.params.commentid

    getCommentInfo(commentID).then((result) => {
      self.setState({
        postTitle: result.title,
        postBody: result.body
      })
      // Get parent information (category name)
      return this.props.boundFetchPostsDetails(result.parentId)
    })
  }

  render() {
    return (<div id="header-spacer">
      <div className="new-post-header">
        Edit Comment
      </div>
      <div id="new-post">
        <form onSubmit={this.handleSubmit}>
          Content <br />
          <textarea className="boxsizingBorder" ref="body" name="postBody" value={this.state.postBody} onChange={this.changeBody} required></textarea><br />
          <input type="button" value="Cancel"></input>
          <input type="submit" value="Save"></input>
        </form>
      </div>
    </div>);
  }
}

function mapStateToProps (state) {
  console.log(state)
  return {
    currentCategory: state.postsDetailState.thisPost.category,
    parentID: state.postsDetailState.thisPost.id
  }
}

const mapDispatchToProps = dispatch => ({
  boundFetchPostsDetails: (postsID) => dispatch(fetchPostsDetails(postsID))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
