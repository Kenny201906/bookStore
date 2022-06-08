import http from '../request/index.js';
const cartApi = {
	addCart: '/cart/add',
	getCart: '/cart/getCarts',
	deleteCart: '/cart/deleteBatch'
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