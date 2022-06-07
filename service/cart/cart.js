import http from '../request/index.js';
const cartApi = {
	addCart: '/cart/add'
}
export function addCart(){
	return http.post(cartApi.addCart,{
		...data
	})
}