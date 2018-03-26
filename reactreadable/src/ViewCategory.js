import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ViewPost from './ViewPost'
import { getTimeDifference, handleUpVoteDOM, handleDownVoteDOM } from '../utils/helpers.js'
import { getPosts, postUpVote, postDownVote } from '../utils/api.js'

export default class Category extends React.Component {
  state = {
    category: '',
    posts: []
  }

  static propTypes = {
    category: PropTypes.string,
  }

  componentDidMount() {
    // Dispatch here
    this.setState({category: this.props.match.params.category},
      () => this.fetchAndUpdatePosts()
    );
  }

  componentDidUpdate () {
    if (this.state.category !== this.props.match.params.category) {
      // Dispatch here
      this.setState({category: this.props.match.params.category},
        () => this.fetchAndUpdatePosts()
      );
    }
  }

  fetchAndUpdatePosts () {
    var thisCategory = this.state.category
    getPosts(thisCategory).then((posts) => {
      // Dispatch here
      this.setState({posts})
    });
  }

  handleUpVote(type, id) {
    postUpVote(type, id).then((id) => {
      var posts = handleUpVoteDOM(this.state.posts, id)
      // Dispatch here
      this.setState({posts})
    })
  }

  handleDownVote(type, id) {
    postDownVote(type, id).then((id) => {
      var posts = handleDownVoteDOM(this.state.posts, id)
      // Dispatch here
      this.setState({posts})
    })
  }

  handleSort(e, sortMethod) {
    e.preventDefault()
    var posts = this.state.posts

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
    this.setState({posts})
  }

  render() {
    return (
    <div id="inside">
      {this.state.posts.length > 0 &&
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
          (this.state.posts.length !== 0) ? (
            this.state.posts.map((result, i) => {
              if (result.deleted !== true) {
                return (
                  <li key={i}>
                    <Link to={'/' + result.category + '/' + result.id} component={ViewPost}>
                      <span className="item-header">{result.title}</span>
                    </Link>
                    <p className="item-author">
                      [<a href='#upvote' onClick={() => this.handleUpVote('posts', result.id)}>+</a>]
                      [<a href='#downvote' onClick={() => this.handleDownVote('posts', result.id)}>-</a>]{' '}
                      {result.voteScore} points by <strong>{result.author}</strong> |{' '}
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
