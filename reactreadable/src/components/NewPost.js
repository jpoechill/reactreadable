import React from 'react';
import PropTypes from 'prop-types';
import { firstToUpper, makeID } from '../utils/helpers.js'
import { makePost } from '../utils/api.js'
import { setCategory } from '../actions'
import { connect } from 'react-redux'

export class NewPost extends React.Component {
  constructor(props) {
   super(props);
   this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit(e) {
    var self = this
    var data = {
      id: makeID(),
      timestamp: Date.now(),
      title: self.refs.title.value,
      body: self.refs.body.value,
      author: self.refs.author.value,
      category: self.refs.category.value
    }

    e.preventDefault();
    makePost(data).then(() => {
      self.context.router.history.push('/' + data.category + '/' + data.id );
    });
  }

  renderCategories() {
    if (this.props.categories.length > 1) {
      return this.props.categories.map((result, i) => {
        return (
          <option value={result.name} key={i}>{firstToUpper(result.name)}</option>
        );
      })
    }
  }

  render() {
    return (<div id="header-spacer">
      <div className="new-post-header">
        New Post
      </div>
      <div id="new-post">
        <form onSubmit={this.handleSubmit}>
          Category <br />
          <input type="hidden" ref="id" value="123" />
          <input type="hidden" ref="timestamp" value="234" />
          <input type="hidden" ref="author" value="E. Hemmingway" />
        <select className="btn-default" ref="category">
          {this.renderCategories()}
        </select> <br />
          Title <br />
          <input type="text" ref="title" required placeholder="Enter a title..."></input> <br />
          Content <br />
          <textarea className="boxsizingBorder" ref="body" required placeholder="Enter content..."></textarea><br />
          <input type="button" value="Cancel"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>);
  }
}


function mapStateToProps (state) {
  return {
    categories: state.categoriesState.categories,
  }
}

const mapDispatchToProps = dispatch => ({
  boundSetCategory: (category) => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
