import { combineReducers } from 'redux'
import CategoriesReducer from './categoriesReducer'
import PostsDetailReducer from './postsDetailReducer'
import PostsReducer from './postsReducer'

// Export Reducers
export default combineReducers({
  categoriesState: CategoriesReducer,
  postsDetailState: PostsDetailReducer,
  postsState: PostsReducer
})
