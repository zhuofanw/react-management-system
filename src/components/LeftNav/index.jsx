import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.less";
import logo from "../../assets/images/logo.svg";

import { Menu } from "antd";
import {
	AppstoreOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default class LeftNav extends Component {
	render() {
		return (
			<div className="left-nav">
				<Link to="/" className="left-nav-header">
					<img src={logo} alt="" />
					<h1>管理系统后台</h1>
				</Link>
				<Menu
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					mode="inline"
					theme="dark"
				>
					<Menu.Item key="homePage" icon={<PieChartOutlined />}>
						首页
					</Menu.Item>
					<SubMenu key="sub1" icon={<MailOutlined />} title="商品">
						<Menu.Item key="typeManagement" icon={<MailOutlined />}>
							品类管理
						</Menu.Item>
						<Menu.Item key="productManagement" icon={<MailOutlined />}>
							商品管理
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="userManagement" icon={<DesktopOutlined />}>
						用户管理
					</Menu.Item>
					<Menu.Item key="roleManagement" icon={<DesktopOutlined />}>
						角色管理
					</Menu.Item>
					<SubMenu key="sub1" icon={<MailOutlined />} title="图形图表">
						<Menu.Item key="barChart" icon={<MailOutlined />}>
							柱形图
						</Menu.Item>
						<Menu.Item key="lineChart" icon={<MailOutlined />}>
							折线图
						</Menu.Item>
						<Menu.Item key="pieChart" icon={<MailOutlined />}>
							饼图
						</Menu.Item>
					</SubMenu>
				</Menu>
			</div>
		);
	}
}
