import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/request/index.js';
import message from '../service/request/message.js';

import {
  getUserById
} from '../service/user/user.js';

import {
  getMessageList,
  searchMessage,
  getMessage,
  remarkIsRead,
  hasMessage
} from '../service/message/message.js'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    scheduleListState: [],
    forcedLogin: false, //是否强制登录
    hasLogin: false,
  },
  mutations: {
    changeScheduleList(state, scheduleList) {
      state.scheduleListState = scheduleList
    }
  },
  actions: {
  
    //用户相关请求
    async getUserByIdAction({
      commit
    }, payload) {
      const res = await getUserById(payload)
      if (!res.code == 200) {
        return uni.$u.toast('请求失败');
      }
      return res.user
    },
	async getUserByIdAction({
	  commit
	}, payload) {
	  const res = await getUserById(payload)
	  if (!res.code == 200) {
	    return uni.$u.toast('请求失败');
	  }
	  return res.user
	},





  },


})
export default store
