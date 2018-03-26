// Basic helper functions

export function makeID () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function handleUpVoteDOM (posts, id) {
  if (Array.isArray(posts) === true) {
    return posts.map((post, index) => {
      if (post.id === id) {
        post.voteScore++
      }
      return post
    })
  } else {
    posts.voteScore++
    return posts
  }
}

export function handleDownVoteDOM (posts, id) {
  if (Array.isArray(posts) === true) {
    return posts.map((post, index) => {
      if (post.id === id) {
        post.voteScore--
      }
      return post
    })
  } else {
    posts.voteScore--
    return posts
  }
}

export function firstToUpper (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getTimeDifference (current, previous) {
  var msPerMinute = 60000; //
  var msPerHour = msPerMinute * 60; //
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
      return "Just now";
  } else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours ago';
  } else if (elapsed < msPerMonth) {
      return Math.round(elapsed/msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
      return Math.round(elapsed/msPerMonth) + ' months ago';
  } else {
      if (Math.round(elapsed/msPerYear ) === 1) {
        return '1 year ago'
      } else {
        return Math.round(elapsed/msPerYear ) + ' years ago';
      }
  }
}

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
