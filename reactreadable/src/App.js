import React from 'react';
import { Link } from 'react-router-dom'
import { Route, Switch, withRouter } from 'react-router-dom'
import NewPost from './components/NewPost'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'
import DeletePost from './components/DeletePost'
import DeleteComment from './components/DeleteComment'
import ViewCategory from './components/ViewCategory'
import ViewDefault from './components/ViewDefault'
import ViewPost from './components/ViewPost'
import { connect } from 'react-redux'
import { getCategories } from './utils/api'
import { addCategories } from './actions'
import './App.css';

class App extends React.Component {
  componentDidMount() {
    var self = this;
    getCategories().then(function (categories) {
      self.props.boundAddCategories(categories)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="title"><Link to="/"><span id="no-underline">Readable</span></Link>
            <ul className='categories-list' >
              {this.props.categories.map((result, i) => {
                return (
                  <li key={i}>
                    <Link to={'/' + result.name}>{result.name}</Link>
                  </li>)
              })}
              <li>
                |
              </li>
              <li>
                <Link to="/addpost">new post</Link>
              </li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route exact path='/' component={ViewDefault}/>
          <Route exact path='/addpost' component={NewPost}/>
          <Route exact path='/editpost/:postid' component={EditPost}/>
          <Route exact path='/deletepost/:postid' component={DeletePost}/>
          <Route exact path='/deletecomment/:commentid' component={DeleteComment}/>
          <Route exact path='/editcomment/:commentid' component={EditComment}/>
          <Route exact path='/upvote/:postid' component={EditPost}/>
          <Route exact path='/downvote/:postid' component={EditPost}/>
          <Route exact path='/:category' component={ViewCategory}/>
          <Route exact path='/:category/:postid' component={ViewPost}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categoriesState.categories
  }
}

const mapDispatchToProps = dispatch => ({
  boundAddCategories: (categories) => dispatch(addCategories(categories))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
