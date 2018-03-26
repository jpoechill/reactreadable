import React from 'react';
import NewComment from './NewComment'
import { Link } from 'react-router-dom'
import { getTimeDifference, isEmpty, handleUpVoteDOM, handleDownVoteDOM } from '../utils/helpers.js'
import { postUpVote, postDownVote } from '../utils/api.js'
import { connect } from 'react-redux'
import { setCategory, fetchPostsDetails, addPostsDetails, addPostsComments } from '../actions'

export class GetPost extends React.Component {
  componentDidMount() {
    var currentCategory = this.props.match.params.category
    var postsID = this.props.match.params.postid

    // Fetch post, and then comments
    this.props.boundSetCategory(currentCategory)
    this.props.boundFetchPostsDetails(postsID)
  }

  handleUpVote(type, id, e) {
    e.preventDefault()
    postUpVote(type, id).then((id) => {
      switch (type) {
        case 'posts':
          var thisPost = handleUpVoteDOM(this.props.thisPost, id)
          // Dispatch here
          this.props.boundAddPostsDetails(thisPost)
          break;
        case 'comments':
          var comments = handleUpVoteDOM(this.props.comments, id)
          // Dispatch here
          this.props.boundAddPostsComments(comments)
          break;
        default:
          break;
      }
    })
  }

  handleDownVote(type, id, e) {
    e.preventDefault()
    postDownVote(type, id).then((id) => {
      switch (type) {
        case 'posts':
          var thisPost = handleDownVoteDOM(this.props.thisPost, id)
          // Dispatch here
            this.props.boundAddPostsDetails(thisPost)
          break;
        case 'comments':
          var comments = handleDownVoteDOM(this.props.comments, id)
          // Dispatch here
          this.props.boundAddPostsComments(comments)
          break;
        default:
          break;
      }
    })
  }

  addComment = (comment) => {
    var comments = this.props.comments
    comments.push(comment)
    // Dispatch here
    this.props.boundAddPostsComments(comments)
  }

  handleSort(e, sortMethod,) {
    e.preventDefault()
    var comments = this.props.comments

    switch (sortMethod) {
      case 'dateLow':
        comments.sort(function(a, b) {
          return parseFloat(b.timestamp) - parseFloat(a.timestamp);
        });
        break;
      case 'dateHigh':
        comments.sort(function(a, b) {
          return parseFloat(a.timestamp) - parseFloat(b.timestamp);
        });
        break;
      case 'voteHigh':
        comments.sort(function(a, b) {
          return parseFloat(b.voteScore) - parseFloat(a.voteScore);
        });
        break;
      case 'voteLow':
        comments.sort(function(a, b) {
          return parseFloat(a.voteScore) - parseFloat(b.voteScore);
        });
        break;
      default:
        break;
    }
    // Dispatch here
    this.props.boundAddPostsComments(comments)
  }

  renderComments () {
    return (
      this.props.comments.map((result, i) => {
        if (result.deleted !== true) {
          return (
            <li id="comment" key={i}>
              <span className="item-header">{result.body}</span>
              <span className="item-author"> [<Link to={'/editcomment/' + result.id}>edit</Link>] [<Link to={'/deletecomment/' + result.id}>delete</Link>]</span>
              <p className="item-author">
                [<a href='#upvote' onClick={(e) => this.handleUpVote('comments', result.id, e)}>+</a>] [<a href='#downvote' onClick={(e) => this.handleDownVote('comments', result.id, e)}>-</a>] {result.voteScore} points by <strong>{result.author}</strong> | {getTimeDifference(Date.now(), result.timestamp)}
              </p>
            </li>
          )
        }
        return null
      })
    )
  }

  render() {
    var thisPost = this.props.thisPost
    if (!isEmpty(thisPost)) {
      return (
        <div id="header-spacer">
          <ul id="inside-post">
            <li>
              <span className="item-header">{thisPost.title}</span>
              <p className="item-author">
                [<a href='#upvote' onClick={(e) => this.handleUpVote('posts', thisPost.id, e)}>+</a>] [<a href='#downvote' onClick={(e) => this.handleDownVote('posts', thisPost.id, e)}>-</a>] {thisPost.voteScore} points by <strong>{thisPost.author}</strong> | {getTimeDifference(Date.now(), thisPost.timestamp)} | [<Link to={'/editpost/' + thisPost.id}>edit</Link>] [<Link to={'/deletepost/' + thisPost.id}>delete</Link>]
                <br/> <span className="category-title">{thisPost.category}</span>
              </p>
              {thisPost.body}
            </li>
          </ul>
          <ul id="ul-comment">
            <li id="comment-filter">
              {this.props.comments.length > 0 &&
                <div id="filter-comment-text">
                  sort by:{' '}
                    <a href="#sort" onClick={(e) => this.handleSort(e, 'dateHigh')}>
                      date high
                    </a>,{' '}
                    <a href="#sort" onClick={(e) => this.handleSort(e, 'dateLow')}>
                      date low
                    </a>,{' '}
                    <a href="#sort" onClick={(e) => this.handleSort(e, 'voteHigh')}>
                      vote high
                    </a>,{' '}
                    <a href="#sort" onClick={(e) => this.handleSort(e, 'voteLow')}>
                      vote low
                    </a>
                </div>
              }
            </li>
            {this.renderComments()}
          </ul>
          <NewComment parentID={this.props.match.params.postid} addComment={this.addComment} category={thisPost.category}></NewComment>
        </div>
      );
    } else {
      return (
        <div>Nothing here...</div>
      )
    }
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

const mapDispatchToProps = dispatch => ({
  boundAddPostsComments: (postsComments) => dispatch(addPostsComments(postsComments)),
  boundAddPostsDetails: (postsDetails) => dispatch(addPostsDetails(postsDetails)),
  boundSetCategory: (category) => dispatch(setCategory(category)),
  boundFetchPostsDetails: (postsID) => dispatch(fetchPostsDetails(postsID))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetPost)
