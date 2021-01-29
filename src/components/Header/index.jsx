import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal, message, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { formateDate } from "../../utils/dateUtils";
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import weathericon from "../../assets/images/weather.svg";

import axios from "axios";
import "./index.less";

const WEATHERURL =
	"https://restapi.amap.com/v3/weather/weatherInfo?key=ff3e0c4ee840200c6e70435bb2e481e3&city=110000";
class Header extends Component {
	state = {
		city: "",
		weather: "",
		temperature: "",
		currentTime: formateDate(Date.now()),
	};
	getTime = () => {
		this.IntervalId = setInterval(() => {
			const currentTime = formateDate(Date.now());
			this.setState({ currentTime });
		}, 1000);
	};

	getWeather = () => {
		axios.get(WEATHERURL).then((res) => {
			const result = res.data.lives[0];
			const { city, weather, temperature } = result;
			if ((city, weather, temperature)) {
				this.setState({
					city,
					weather,
					temperature,
				});
			} else {
				message.error("获取天气失败！");
			}
		});
	};

	logout = () => {
		//显示确认框
		Modal.confirm({
			// title: "Do you want to logout current user?",
			icon: <ExclamationCircleOutlined />,
			content: "确定退出吗？",
			onOk: () => {
				console.log("OK");
				storageUtils.removeUser();
				memoryUtils.user = {};
				this.props.history.replace("/login");
			},
		});
	};

	getTitle = () => {
		const path = this.props.location.pathname;
		let title = "";
		menuList.forEach((item) => {
			if (item.key === path) {
				title = item.title;
			} else if (item.children) {
				const cItem = item.children.find((cItem) => cItem.key === path);
				if (cItem) {
					title = cItem.title;
				}
			}
		});
		return title;
	};

	componentDidMount() {
		this.getTime();
		this.getWeather();
	}

	componentWillUnmount() {
		clearInterval(this.IntervalId);
	}

	render() {
		const username = memoryUtils.user.username;
		const { city, currentTime, weather, temperature } = this.state;
		const title = this.getTitle();
		return (
			<div className="header">
				<div className="header-top">
					<span>欢迎，{username}</span>
					<Button danger onClick={this.logout}>
						退出
					</Button>
				</div>
				<div className="header-bottom">
					<div className="header-bottom-left">{title}</div>
					<div className="header-bottom-right">
						<img src={weathericon} alt="weather" />
						<span>
							{city}
							{currentTime}&nbsp; 气温: {temperature}
							&nbsp;
						</span>
						<span>{weather}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Header);
