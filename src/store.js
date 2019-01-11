import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      cell: "",
      dob: {
        date: "",
        age: 0,
      },
      email: "",
      gender: "",
      id: {
        name: "",
        value: "",
      },
      location: {
        street: "",
        city: "",
        state: "",
        postcode: 0,
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        timezone: {
          description: "",
          offset: "",
        },
      },
      login: {
        uuid: "",
        username: "",
        password: "",
        salt: "",
        sha1: "",
        sha256: "",
        md5: "",
      },
      name: {
        first: "",
        last: "",
        title: "",
      },
      nat: "",
      phone: "",
      picture: {
        large: "",
        medium: "",
        thumbnail: "",
      },
      registered: {
        date: "",
        age: 0
      },
      posts: []
    }
  },
  mutations: {
    storeUser (state, user){
      state.user = user;
    }
  },
  actions: {
    storeUser ({commit}, user){
      commit('storeUser', user);
    }
  }
})
