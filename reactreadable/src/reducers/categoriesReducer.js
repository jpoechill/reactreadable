const DEFAULT_STATE = {
  currentCategory: null,
  categories: []
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case "ADD_CATEGORIES": {
      return {
        ...state,
        categories: [
          ...state.categories,
          ...action.payload
        ]
      }
    }
    case "SET_CURRENTCATEGORY": {
      var newState = {
        ...state,
        currentCategory: action.payload
      }
      return newState
    }
    default: {
      return state
    }
  }
}
