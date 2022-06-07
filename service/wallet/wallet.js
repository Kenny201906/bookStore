import http from '../request/index.js';

const walletApi = {
  getWalletInfo: '/wallet',
  recharge: '/wallet/recharge',
  withdraw: '/wallet/withdrawal'
}
export function getWalletInfo(id){
	return http.get(walletApi.getWalletInfo + '/' + id) 
}
export function recharge(data){
	return http.post(walletApi.recharge,{
		...data
	})
}
export function withdraw(data){
	return http.post(walletApi.withdraw,{
		...data
	})
}