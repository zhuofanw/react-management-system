/*
要求：能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/
import ajax from "./ajax";
//登录
const BASEURL = "http://120.55.193.14:5000";
export const reqLogin = (username, password) =>
	ajax(`${BASEURL}/login`, { username, password }, "POST");
export const reqAddUser = (user) =>
	ajax(`${BASEURL}/manage/user/add`, user, "POST");
