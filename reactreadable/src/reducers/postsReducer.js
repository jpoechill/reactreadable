// All posts reducer
const DEFAULT_STATE = {
  posts: []
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case "ADD_POSTS": {
      return {
        ...state,
        posts: [
          ...action.payload
        ]
      }
    }
    default: {
      return state
    }
  }
}
