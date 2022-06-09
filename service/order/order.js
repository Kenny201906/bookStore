import http from '../request/index.js';
const orderApi = {
   getOrder: '/order/myorder',
   borrowOrder: '/order/create',
   backBook: '/order/back'
}
export function getOrder(data){
	return http.post(orderApi.getOrder,{
		...data
	})
}

export function borrowOrder(data){
	return http.post(orderApi.borrowOrder,{
		...data
	})
}

export function backBook(id){
	return http.put(orderApi.backBook + '/' + id);
}