import Vue from 'vue';
import Vuex from 'vuex';
import http from '../service/request/index.js';
import message from '@/service/request/message.js';

import {
  getUserById
} from '../service/user/user.js';

// import {
//   getMessageList,
//   searchMessage,
//   getMessage,
//   remarkIsRead,
//   hasMessage
// } from '../service/message/message.js'

import {
	getWalletInfo,
	recharge,
	withdraw
} from '../service/wallet/wallet.js'

import {
	getOrder
} from '../service/order/order.js'
import {
	addCart,
	getCart,
	deleteCart,
	settlementCart
} from '../service/cart/cart.js'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    forcedLogin: false, //是否强制登录
    hasLogin: false,
  },
  mutations: {

  },
  actions: {
  
    //用户相关请求
    async getUserByIdAction({
      commit
    }, payload) {
      const res = await getUserById(payload)
      if (res.code !== '0') {
        return uni.$u.toast('请求失败');
      }
      return res.user
    },
	async getUserByIdAction({
	  commit
	}, payload) {
	  const res = await getUserById(payload)
	  if (res.code !== '0') {
	    return uni.$u.toast('请求失败');
	  }
	  return res.user
	},
   // 钱包相关请求
   async getWalletInfoAction({commit},payload){
	 const res = await getWalletInfo(payload);
	  if (res.code !== '0') {
	    return uni.$u.toast('请求失败');
	  }
	  return res.data
   },

  async rechargeAction({commit},payload){
	  const res = await recharge(payload);
	  if (res.code !== '0') {
	    return uni.$u.toast('充值失败');
	  }
	  return res.data
  },
  async withdrawAction({commit},payload){
  	  const res = await withdraw(payload);
  	  if ( res.code !== '0') {
  	    return uni.$u.toast('提现失败');
  	  }
  	  return res.data
  },
  // 订单
  async getOrderAction({commit},payload){
	  const res = await getOrder(payload);
	  if ( res.code !== '0') {
	    return uni.$u.toast('获取订单失败');
	  }
	  return res.data
  },
  // 购物车相关接口 
  async addCartAction({commit},payload){
	  const res = await addCart(payload)
	  if ( res.code !== '0') {
	    return uni.$u.toast('添加购物车失败');
	  }
	  return res.data
  },
  async getCartAction({commit},payload){
	  const res = await getCart(payload)
	  if ( res.code !== '0') {
	    return uni.$u.toast('获取购物车失败');
	  }
	  return res.data
  },
  async deleteCartAction({commit},payload){
	  const res = await deleteCart(payload);
	  if(res.code !== '0'){
		  return uni.$u.toast('删除失败')
	  }
  },
  
  async settlementCartAction({commit},payload){
	  const res = await settlementCart(payload);
	  if(res.code !== '0'){
		  return uni.$u.toast('结算失败')
	  }
  }
  },


})
export default store
