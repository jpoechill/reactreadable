import axios from 'axios';
// All functions relating to server api calls

// Fetch all category names, returns promise
export const getCategories = () => {
  var config = {
    headers: { 'Authorization': 'whatever-you-want' }
  };

  return axios.get('http://localhost:5001/categories', config)
  .then(function (response) {
    return response.data.categories; // Categories
  })
  .catch(function (error) {
    console.log(error);
  });
}

// Fetch all posts, returns promise
export const getAllPosts = () => {
  var config = {
    headers: { 'Authorization': 'whatever-you-want' }
  };

  return axios.get('http://localhost:5001/posts', config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response)
  });
}

// Get all posts per single category, returns promise
export const getPosts = (category) => {
  var config = {
    headers: { 'Authorization': 'whatever-you-want' }
  };
  var URL = 'http://localhost:5001/' + category + '/posts'

  return axios.get(URL, config)
  .then(function (response) {
    var posts = response.data;
    return posts;
  })
  .catch(function (error) {
    console.log(error);
  });
}

// Get all deatils per single post, returns promise
export const getPostDetails = (id) => {
  var config = {
    headers: { 'Authorization': 'whatever-you-want' }
  };
  var URL = 'http://localhost:5001/posts/' + id

  return axios.get(URL, config)
    .then(function (response) {
      var thisPost = response.data;
      return thisPost
  })
  .catch(function (error) {
    console.log(error);
  });
}

// Get all comments per single post, returns promise
export const getComments = (id) => {
  var config = {
    headers: { 'Authorization': 'whatever-you-want' }
  };
  var URL = 'http://localhost:5001/posts/' + id + '/comments'

  return axios.get(URL, config)
  .then(function (response) {
    var comments = response.data;
    return comments
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const makePost = (data) => {
  var method = 'post';
  var url = 'http://localhost:5001/posts';
  var headers = {
    'Authorization': 'whatever-you-want',
    'Content-Type': "application/json"
  }

  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers
  })
    .then(function (response) {
      return response
  })
    .catch(function (error) {
      console.log(error.response)
  });
}

export const makeComment = (data) => {
  var method = 'post';
  var url = 'http://localhost:5001/comments';
  var headers = {
    'Authorization': 'whatever-you-want',
    'Content-Type': "application/json"
  }

  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers
  })
    .then(function (response) {
      return response;
  })
    .catch(function (error) {
    console.log(error.response)
  });
}

export const editPost = (data) => {
  var method = 'put';
  var url = 'http://localhost:5001/posts/' + data.id;
  var headers = {
    'Authorization': 'whatever-you-want',
    'Content-Type': "application/json"
  }

  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers
  })
    .then(function (response) {
      return data
   })
    .catch(function (error) {
      console.log(error.response)
   });
}

export const editComment = (commentID, data) => {
    var method = 'put';
    var url = 'http://localhost:5001/comments/' + commentID;
    var headers = {
      'Authorization': 'whatever-you-want',
      'Content-Type': "application/json"
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
      .then(function (response) {
        return response
     })
       .catch(function (error) {
       console.log(error.response)
     });
  }

export const makeDelete = (type, postID) => {
  var method = 'delete';
  var url = 'http://localhost:5001/' + type + '/' + postID;
  var headers = {
    'Authorization': 'whatever-you-want',
    'Content-Type': "application/json"
  }

  return axios({
    method: method,
    url: url,
    headers: headers
  })
     .then(function (response) {
       console.log("Success " + response)
       return response;
   })
     .catch(function (error) {
       console.log(error.response)
   });
}

export const getCommentInfo = (thisPostID) => {
  var config = {
    headers: { 'Authorization': 'whatever-you-want' }
  };
  var URL = 'http://localhost:5001/comments/' + thisPostID

  return axios.get(URL, config)
  .then(function (response) {
    var postData = response.data;
    return postData
  })
  .catch(function (error) {
    console.log(error);
  });
}


// Post upvote to server, returns id
export const postUpVote = (type, id) => {
  var method = 'post';
  var url = 'http://localhost:5001/' + type + '/' + id;
  var data = {'option': 'upVote'};
  var headers = {
    'Authorization': 'whatever-you-want',
    'Content-Type': "application/json"
  }

  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers
  })
  .then(function () {
    return id;
  })
  .catch(function (error) {
    console.log(error.response)
  });
}

// Post downvote to server, returns id
export const postDownVote = (type, id) => {
  var method = 'post';
  var url = 'http://localhost:5001/' + type + '/' + id;
  var data = {'option': 'downVote'};
  var headers = {
    'Authorization': 'whatever-you-want',
    'Content-Type': "application/json"
  }

  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers
  })
  .then(function () {
    return id;
  })
  .catch(function (error) {
    console.log(error.response)
  });
}
