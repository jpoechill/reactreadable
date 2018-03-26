import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getTimeDifference, handleUpVoteDOM, handleDownVoteDOM } from '../utils/helpers.js'
import { getComments, postUpVote, postDownVote } from '../utils/api.js'
import { connect } from 'react-redux'
import { addPosts, setCategory, fetchPosts } from '../actions'

export class Category extends React.Component {
  static propTypes = {
    category: PropTypes.string,
  }

  componentDidMount() {
    let currentCategory = this.props.match.params.category
    this.fetchAndUpdatePosts(currentCategory)
  }

  componentDidUpdate () {
    var currentCategory = this.props.match.params.category
    if (this.props.currentCategory !== currentCategory) {
      this.fetchAndUpdatePosts(currentCategory)
    }
  }

  fetchAndUpdatePosts (currentCategory) {
    let outerPosts
    this.props.boundSetCategory(currentCategory)
    this.props.boundFetchPosts(currentCategory).then((posts) => {
      outerPosts = posts
      return Promise.all(posts.map((post) => getComments(post.id))
      )
    // Fetch comments
    }).then((comments) => {
      outerPosts.forEach((post, i) => post.commentsCount = comments[i].length)

    // Dispatch
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
        return posts;
    }
    // Dispatch here
    this.props.boundAddPosts(posts)
  }

  render() {
    return (
    <div id="inside">
      {this.props.posts.length > 0 &&
        <div id="filter-text">
          sort by:{' '}
          <a href="#sort" role="button" onClick={(e) => this.handleSort(e, 'dateHigh')}>
            date high
          </a>,{' '}
          <a href="#sort" role="button" onClick={(e) => this.handleSort(e, 'dateLow')}>
            date low
          </a>,{' '}
          <a href="#sort" role="button" onClick={(e) => this.handleSort(e, 'voteHigh')}>
            vote high
          </a>,{' '}
          <a href="#sort" role="button" onClick={(e) => this.handleSort(e, 'voteLow')}>
            vote low
          </a>
        </div>
      }
      <ul>
        {
          (this.props.posts.length !== 0) ? (
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
          )
        }
      </ul>
    </div>);
  }
}

function mapStateToProps (state) {
  console.log(state)
  return {
    currentCategory: state.categoriesState.currentCategory,
    posts: state.postsState.posts
  }
}

const mapDispatchToProps = dispatch => ({
  boundAddPosts: (posts) => dispatch(addPosts(posts)),
  boundSetCategory: (category) => dispatch(setCategory(category)),
  boundFetchPosts: (category) => dispatch(fetchPosts(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Category)
