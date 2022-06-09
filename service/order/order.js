import http from '../request/index.js';
const orderApi = {
   getOrder: '/order/myorder'
}
export function getOrder(data){
	return http.post(orderApi.getOrder,{
		...data
	})
}