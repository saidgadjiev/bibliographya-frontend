const state = {
  backgroundImagePath: undefined
}

const mutations = {
  setBackgroundImage (state, imagePath) {
    state.backgroundImagePath = imagePath
  },
  clearBackgroundImage (state) {
    state.backgroundImagePath = undefined
  }
}

const getters = {
  backgroundImagePath: state => {
    return state.backgroundImagePath
  }
}

export default {
  state,
  mutations,
  getters
}
