import { getPosts, getPostDetails, getComments } from '../utils/api.js'
import {  ADD_CATEGORIES, SET_CURRENTCATEGORY, ADD_POSTS,
          ADD_POSTS_DETAILS, ADD_POSTS_COMMENTS, EDIT_POSTS_DETAILS,
          EDIT_POSTS_COMMENTS } from './types'

export function addCategories(allCategories) {
  return {
    type: ADD_CATEGORIES,
    payload: allCategories
  }
}

export function setCategory(category) {
  return {
    type: SET_CURRENTCATEGORY,
    payload: category
  }
}

export function addPosts(allPosts) {
  return {
    type: ADD_POSTS,
    payload: allPosts
  }
}

export function addPostsDetails(postsDetails) {
  return {
    type: ADD_POSTS_DETAILS,
    payload: postsDetails
  }
}

export function addPostsComments(postsComments) {
  return {
    type: ADD_POSTS_COMMENTS,
    payload: postsComments
  }
}
export function editPostsDetails(comments) {
  return {
    type: EDIT_POSTS_DETAILS,
    payload: comments
  }
}

export function editPostsComments(comments) {
  return {
    type: EDIT_POSTS_COMMENTS,
    payload: comments
  }
}

export const fetchPosts = (category) => dispatch => (
  getPosts(category)
    .then(posts => {
      dispatch(addPosts(posts))
      return posts
    })

);


export const fetchPostsDetails = (postID) => dispatch => (
  getPostDetails(postID)
    .then(postsDetails => {
      dispatch(addPostsDetails(postsDetails))
      return getComments(postsDetails.id)
    })
    .then((comments) => (
      dispatch(addPostsComments(comments))
   ))
);
