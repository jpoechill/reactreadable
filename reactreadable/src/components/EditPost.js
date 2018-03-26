import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchPostsDetails } from '../actions'
import { editPost } from '../utils/api'

export class EditPost extends React.Component {
  state = {
    formTitle: '',
    formBody: ''
  }

  static contextTypes = {
      router: PropTypes.object
  }

  handleSubmit = (e) => {
    var self = this;
    var data = {
      title: this.state.formTitle,
      body: this.state.formBody,
      category: this.props.thisPost.category,
      id: this.props.thisPost.id
    }

    e.preventDefault();
    editPost(data).then(() =>
      self.context.router.history.push('/' + data.category + "/" + data.id)
    );
  }

  changeTitle = (e) => {
    // Update local
    this.setState({formTitle: e.target.value});
  }

  changeBody = (e) => {
    // Update local
    this.setState({formBody: e.target.value});
  }

  componentDidMount() {
    var thisPostID = this.props.match.params.postid
    this.props.boundFetchPostsDetails(thisPostID).then(() => {
      // For local state only
      this.setState({
        formTitle: this.props.thisPost.title,
        formBody: this.props.thisPost.body
      })
    })
  }

  render() {
    return (<div id="header-spacer">
      <div className="new-post-header">
        Edit Post
      </div>
      <div id="new-post">
        <form onSubmit={this.handleSubmit}>
          Title <br />
          <input type="text" ref="title" name="postTitle" value={this.state.formTitle} onChange={this.changeTitle} required></input> <br />
          Content <br />
          <textarea className="boxsizingBorder" ref="body" name="postBody" value={this.state.formBody} onChange={this.changeBody} required></textarea><br />
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
    currentCategory: state.categoriesState.currentCategory,
    thisPost: state.postsDetailState.thisPost,
  }
}

const mapDispatchToProps = dispatch => ({
  boundFetchPostsDetails: (postsID) => dispatch(fetchPostsDetails(postsID))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
