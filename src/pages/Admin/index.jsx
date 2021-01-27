import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
export default class Admin extends Component {
	render() {
		const { user } = memoryUtils;
		// console.log(user);
		if (!user || !user._id) {
			//自动跳转到登录界面(在render中)
			return <Redirect to="/login" />;
		}
		return <div>Hello {user.username}!!</div>;
	}
}
