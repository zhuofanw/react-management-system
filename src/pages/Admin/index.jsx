import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
	render() {
		const { user } = memoryUtils;
		// console.log(user);
		if (!user || !user._id) {
			//自动跳转到登录界面(在render中)
			return <Redirect to="/login" />;
		}
		return (
			<Layout style={{ height: "100%" }}>
				<Sider>
					<LeftNav />
				</Sider>
				<Layout>
					<Header>Header</Header>
					<Content style={{ backgroundColor: "#fff" }}>Content</Content>
					<Footer style={{ textAlign: "center", color: "#cccccc" }}>
						推荐使用谷歌浏览器，可以获得更佳页面操作体验
					</Footer>
				</Layout>
			</Layout>
		);
	}
}
