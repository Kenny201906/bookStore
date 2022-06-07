import http from '../request/index.js';
const cartApi = {
	addCart: '/cart/add',
	getCart: '/cart/getCarts'
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