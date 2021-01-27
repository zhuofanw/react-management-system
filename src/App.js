import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				{/* 只匹配其中一个 */}
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/" component={Admin}></Route>
				</Switch>
			</BrowserRouter>
		);
	}
}
