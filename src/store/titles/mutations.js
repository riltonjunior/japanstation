const SET_TITLES = (state, titles) => {
  state.titles = titles
}

const SET_CURRENT_TITLE = (state, title) => {
  state.currentTitle = title
}

const SET_STEP = (state, step) => {
  state.step = step
}

const SET_TITLES_PAGINATION = (state, pag) => {
  state.pagination = pag
}

const ADD_TITLE = (state, title) => {
  state.titles = [title, ...state.titles]
}

const UPDATE_TITLE = (state, title) => {
  state.titles = state.titles
    .map(_title => _title.id === title.id ? title : _title)
}

const DELETE_TITLE = (state, title) => {
  state.titles = state.titles.filter(_title => _title.id !== title.id)
}

const DELETE_CURRENT_TITLE = (state, title) => {
  state.currentTitle = null
}

export {
  SET_TITLES,
  SET_TITLES_PAGINATION,
  ADD_TITLE,
  UPDATE_TITLE,
  DELETE_TITLE,
  SET_CURRENT_TITLE,
  DELETE_CURRENT_TITLE,
  SET_STEP
}
