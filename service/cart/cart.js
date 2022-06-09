import http from '../request/index.js';
const cartApi = {
	addCart: '/cart/add',
	getCart: '/cart/getCarts',
	deleteCart: '/cart/deleteBatch',
	settlementCart: '/cart/settlement'
}
export function addCart(data){
	return http.post(cartApi.addCart,{
		...data
	})
}

export function getCart(data){
	return http.post(cartApi.getCart,{
		...data
	})
}

export function deleteCart(data){
	return http.post(cartApi.deleteCart,data)
}

export function settlementCart(data){
	return http.post(cartApi.settlementCart,{
		...data
	})
}