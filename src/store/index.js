import { createStore } from 'vuex'
import Cookies from 'js-cookie'

const animation = {
  namespaced: true,
  // 只有开启了这个才能自定义名称
  state: {
    switch: false,
    opacity: 1
  },
  getters: {},
  mutations: {
    login(sta, val) {
      sta.opacity = val
    },
    switch(sta, val) {
      sta.switch = val
    }
  },
  actions: {
    opcity(context, val) {
      if (context.state.switch == true) {
        const timer = setInterval(() => {
          val += 0.1
          context.commit('login', val)
          if (val >= 1) {
            clearInterval(timer)
          }
        }, 30)
      }
    }
  }
}

export default createStore({
  state: {
    post: {
      headPotrait: '',
      userName: '',
      id: '',
      title: '',
      photo: []
    },
    userName: '',
    id: ''
  },
  getters: {
    // getUsername(state) {
    //   return state.userName
    // }
  },
  mutations: {
    getpost(state, post) {
      state.post = post
    },
    setUsername(state, val) {
      state.userName = val
    },
    setId(state, val) {
      state.id = val
    }
  },
  actions: {},
  modules: {
    animation
  }
})
