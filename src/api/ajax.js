import axios from "axios";
import { message } from "antd";
//封装axios,返回值是promise对象
export default function ajax(url, data = {}, method = "GET") {
	return new Promise((resolve, reject) => {
		let promise;
		if (method === "GET") {
			promise = axios.get(url, {
				params: data,
			});
		} else {
			//post请求
			promise = axios.post(url, data);
		}
		promise
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				message.error("请求出错了:" + error.message);
			});
	});
}
