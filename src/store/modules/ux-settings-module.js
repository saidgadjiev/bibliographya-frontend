const state = {
  layout: undefined
}

const mutations = {
  setLayout (state, layout) {
    state.layout = layout
  }
}

const getters = {
  layout: state => {
    return state.layout
  }
}

export default {
  state,
  mutations,
  getters
}
