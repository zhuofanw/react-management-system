import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { Menu } from "antd";
import menuList from "../../config/menuConfig";
import "./index.less";

const { SubMenu } = Menu;
class LeftNav extends Component {
	// 根据menu的数据数组生成对应的标签数组
	getMenuNodes = (menuList) => {
		const path = this.props.location.pathname;
		return menuList.map((item) => {
			if (!item.children) {
				return (
					<Menu.Item key={item.key} icon={item.icon}>
						<Link to={item.key}>{item.title}</Link>
					</Menu.Item>
				);
			} else {
				//查找一个与当前请求路径匹配的子Item
				const cItem = item.children.find((cItem) => cItem.key === path);
				//如果存在，说明当前item的子列表需要打开
				if (cItem) this.openKey = item.key;
				return (
					<SubMenu key={item.key} icon={item.icon} title={item.title}>
						{this.getMenuNodes(item.children)}
					</SubMenu>
				);
			}
		});
	};
	UNSAFE_componentWillMount() {
		this.menuNodes = this.getMenuNodes(menuList);
	}
	render() {
		const path = this.props.location.pathname;
		// console.log(this.openKey);
		return (
			<div className="left-nav">
				<Link to="/" className="left-nav-header">
					<img src={logo} alt="" />
					<h1>管理系统后台</h1>
				</Link>
				<Menu
					selectedKeys={[path]}
					defaultOpenKeys={[this.openKey]}
					mode="inline"
					theme="dark"
				>
					{/* <Menu.Item key="homePage" icon={<HomeOutlined />}>
						<Link to="/home">首页</Link>
					</Menu.Item>
					<SubMenu key="sub1" icon={<MailOutlined />} title="商品">
						<Menu.Item key="typeManagement" icon={<MailOutlined />}>
							<Link to="/category">品类管理</Link>
						</Menu.Item>
						<Menu.Item key="productManagement" icon={<MailOutlined />}>
							<Link to="/product">商品管理</Link>
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="userManagement" icon={<UserOutlined />}>
						<Link to="/user">用户管理</Link>
					</Menu.Item>
					<Menu.Item key="roleManagement" icon={<DesktopOutlined />}>
						<Link to="/role">角色管理</Link>
					</Menu.Item>
					<SubMenu key="sub2" icon={<MailOutlined />} title="图形图表">
						<Menu.Item key="barChart" icon={<MailOutlined />}>
							<Link to="/charts/bar">柱状图</Link>
						</Menu.Item>
						<Menu.Item key="lineChart" icon={<MailOutlined />}>
							<Link to="/charts/line">折线图</Link>
						</Menu.Item>
						<Menu.Item key="pieChart" icon={<PieChartOutlined />}>
							<Link to="/charts/pie">饼状图</Link>
						</Menu.Item>
					</SubMenu> */}
					{this.menuNodes}
				</Menu>
			</div>
		);
	}
}
export default withRouter(LeftNav);
