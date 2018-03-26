import React from 'react';
import PropTypes from 'prop-types';
import { makeID } from '../utils/helpers.js'
import { makeComment } from '../utils/api.js'

export default class NewPost extends React.Component {
  constructor(props) {
   super(props);
   this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    parentID: PropTypes.string,
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit = (e) => {
    var self = this
    var data = {
      id: makeID(),
      timestamp: Date.now(),
      body: self.refs.body.value,
      author: self.refs.author.value,
      parentId: self.props.parentID,
      voteScore: 1
    }

    e.preventDefault();
    if (self.refs.body.value !== '') {
      makeComment(data).then(() => {
        self.props.addComment(data)
        self.refs.body.value = ''
      })
    };
  }

  render() {
    return (<div>
      <div className="new-comment">
        <hr />
        <div className="new-comment-header">
          New Comment
        </div>
        <form onSubmit={this.handleSubmit}>
          <textarea className="boxsizingBorder" ref="body" placeholder="Make a new comment..."></textarea><br />
          <input type="hidden" ref="author" value="E. Hemmingway"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>);
  }
}
