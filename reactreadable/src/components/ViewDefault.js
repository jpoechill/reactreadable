import React from 'react';
import { Link } from 'react-router-dom'
import { getTimeDifference, handleUpVoteDOM, handleDownVoteDOM } from '../utils/helpers.js'
import { getAllPosts, getComments, postUpVote, postDownVote } from '../utils/api.js'
import { connect } from 'react-redux'
import { addPosts, setCategory } from '../actions'

class Root extends React.Component {
  componentDidMount() {
    let outerPosts

    // Fetch posts
    getAllPosts().then((posts) => {
      outerPosts = posts
      return Promise.all(posts.map((post) => getComments(post.id))
      )
    // Fetch comments
    }).then((comments) => {
      outerPosts.forEach((post, i) => post.commentsCount = comments[i].length)

    // Dispatch
      this.props.boundSetCategory('')
      this.props.boundAddPosts(outerPosts)
    })
  }

  fetchAndUpdatePosts (currentCategory) {
    let outerPosts

    // Fetch posts
    getAllPosts().then((posts) => {
      outerPosts = posts
      return Promise.all(posts.map((post) => getComments(post.id))
      )
    // Fetch comments
    }).then((comments) => {
      outerPosts.forEach((post, i) => post.commentsCount = comments[i].length)

    // Dispatch
      this.props.boundSetCategory('')
      this.props.boundAddPosts(outerPosts)
    })
  }

  handleUpVote(type, id) {
    postUpVote(type, id).then((id) => {
      var posts = handleUpVoteDOM(this.props.posts, id)
      // Dispatch here
      this.props.boundAddPosts(posts)
    })
  }

  handleDownVote(type, id) {
    postDownVote(type, id).then((id) => {
      var posts = handleDownVoteDOM(this.props.posts, id)
      // Dispatch here
      this.props.boundAddPosts(posts)
    })
  }

  handleSort(e, sortMethod) {
    e.preventDefault()
    var posts = this.props.posts

    switch (sortMethod) {
      case 'dateLow':
        posts.sort(function(a, b) {
          return parseFloat(b.timestamp) - parseFloat(a.timestamp);
        });
        break;
      case 'dateHigh':
        posts.sort(function(a, b) {
          return parseFloat(a.timestamp) - parseFloat(b.timestamp);
        });
        break;
      case 'voteHigh':
        posts.sort(function(a, b) {
          return parseFloat(b.voteScore) - parseFloat(a.voteScore);
        });
        break;
      case 'voteLow':
        posts.sort(function(a, b) {
          return parseFloat(a.voteScore) - parseFloat(b.voteScore);
        });
        break;
      default:
        break;
    }

    // Dispatch here
    this.props.boundAddPosts(posts)
  }

  checkIfAnyVisible() {
    if (this.props.posts.length > 0) {
      this.props.posts.map((result, i) => {
        if (result.deleted === false) {
          return true
        }
        return false
      })
    }
    return false
  }

  render() {
    return (
      <div id="inside">
        {!this.checkIfAnyVisible() &&
          <div id="filter-text">
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
        <ul>
          {!this.checkIfAnyVisible() ? (
              this.props.posts.map((result, i) => {
                if (result.deleted !== true) {
                  // console.log(result)
                  return (
                    <li key={i}>
                      <Link to={'/' + result.category + '/' + result.id}>
                        <span className="item-header">{result.title}</span>
                      </Link>
                      <p className="item-author">
                        [<a href='#upvote' onClick={() => this.handleUpVote('posts', result.id)}>+</a>]
                        [<a href='#downvote' onClick={() => this.handleDownVote('posts', result.id)}>-</a>]{' '}
                        {result.voteScore} points by <strong>{result.author}</strong> |{' '}
                        {result.commentsCount} comments |{' '}
                        {getTimeDifference(Date.now(), result.timestamp)} {' '}
                        [<Link to={'/editpost/' + result.id}>edit</Link>]{' '}
                        [<Link to={'/deletepost/' + result.id}>delete</Link>]
                      </p>
                      <div className="category-title">{result.category}</div>
                    </li>
                  )
                }
                return null
              })
              ) : (
                "Sorry, no posts to show..."
              )}
        </ul>
      </div>
    );
  }
}


function mapStateToProps (state) {
  console.log(state)
  return {
    currentCategory: state.categoriesState.category,
    posts: state.postsState.posts
  }
}

const mapDispatchToProps = dispatch => ({
  boundAddPosts: (posts) => dispatch(addPosts(posts)),
  boundSetCategory: (category) => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Root)
