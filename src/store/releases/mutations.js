/* START RELEASES MUTATION HANDLERS */
const SET_RELEASES = (state, releases) => {
  state.releases = releases
}

const SET_RELEASES_PAGINATION = (state, pag) => {
  state.pagination = pag
}

const ADD_RELEASE = (state, release) => {
  state.releases = [release, ...state.releases]
}

const UPDATE_RELEASE = (state, release) => {
  state.releases = state.releases
    .map(_release => _release.id === release.id ? release : _release)
}

const DELETE_RELEASE = (state, release) => {
  state.releases = state.releases.filter(_release => _release.id !== release.id)
}

// [types.ADD_COMMENT](state, comment) {
//   const post = state.posts.find(post => post.id === comment.post_id)
//   post.comments = [...post.comments, comment]
// },

// [types.UPDATE_COMMENT](state, comment) {
//   const post = state.posts.find(post => post.id === comment.post_id)
//   post.comments = post.comments
//     .map(_comment => _comment.id === comment.id ? comment : _comment)
// },

// [types.DELETE_COMMENT](state, comment) {
//   const post = state.posts.find(post => post.id === comment.post_id)
//   post.comments = post.comments
//     .filter(_comment => _comment.id !== comment.id)
// },

// [types.DOWNVOTE_POST](state, _vote) {
//   const post = state.posts.find(post => post.id === _vote.post_id)
//   post.votes =  post.votes.filter(vote => vote.id !== _vote.id)
// },

// [types.UPVOTE_POST](state, vote) {
//   const post = state.posts.find(post => post.id === vote.post_id)
//   post.votes = [...post.votes, vote]
// },

// [types.INCREMENT_PAGINATION_ENTRIES](state) {
//   state.pagination.total_entries += 1
// },

// [types.DECREMENT_PAGINATION_ENTRIES](state) {
//   state.pagination.total_entries -= 1
// },
/* END RELEASES MUTATION HANDLERS */

/* START CURRENT RELEASE MUTATION HANDLERS */
const SET_CURRENT_RELEASE = (state, release) => {
  state.currentRelease = release
}

const DELETE_CURRENT_RELEASE = (state, release) => {
  state.currentRelease = null
}
/* END CURRENT RELEASE MUTATION HANDLERS */

export {
  SET_RELEASES,
  SET_RELEASES_PAGINATION,
  ADD_RELEASE,
  UPDATE_RELEASE,
  DELETE_RELEASE,
  SET_CURRENT_RELEASE,
  DELETE_CURRENT_RELEASE
}

// [types.ADD_COMMENT_IN_CURRENT_POST](state, comment) {
//   state.currentPost.comments = [...state.currentPost.comments, comment]
// },

// [types.UPDATE_COMMENT_IN_CURRENT_POST](state, comment) {
//   state.currentPost.comments = state.currentPost.comments
//     .map(_comment => _comment.id === comment.id ? comment : _comment)
// },

// [types.DELETE_COMMENT_IN_CURRENT_POST](state, comment) {
//   state.currentPost.comments = state.currentPost.comments
//     .filter(_comment => _comment.id !== comment.id)
// },

// [types.UPVOTE_POST_IN_CURRENT_POST](state, vote) {
//   state.currentPost.votes = [...state.currentPost.votes, vote]
// },

// [types.DOWNVOTE_POST_IN_CURRENT_POST](state, _vote) {
//   state.currentPost.votes =  state.currentPost.votes
//     .filter(vote => vote.id !== _vote.id)
// },
// /* END <CURRENT POST MUTATION HANDLERS> */

// [types.SET_POST_ERRORS](state, errors) {
//   state.postErrors = errors
// },

// [types.CLEAR_POST_ERRORS](state) {
//   state.postErrors = {}
// }
