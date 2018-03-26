// Post DEFAULT_STATEils reducer
const DEFAULT_STATE = {
  category: null,
  postID: null,
  thisPost: {
    id: null,
    timestamp: null,
    title: null,
    body: null,
    author: null,
    category: null
  },
  comments: []
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case "ADD_POSTS_DETAILS": {
      return {
        ...state,
        thisPost: {
          ...action.payload
        }
      }
    }
    case "ADD_POSTS_COMMENTS": {
      return {
        ...state,
        comments: [
          ...action.payload
        ]
      }
    }
    case "EDIT_POSTS_COMMENTS": {
      return {
        ...state,
        comments: [
          ...action.payload
        ]
      }
    }
    case "ERROR": {
      console.log("There was an ERROR")
      return {
        ...state
      }
    }
    default: {
      return state
    }
  }
}
