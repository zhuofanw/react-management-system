import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

import "./index.less";
import logo from "../../assets/images/logo.svg";

class Login extends Component {
	render() {
		//如果用户已经登录，自动跳转到管理界面
		const user = memoryUtils.user;
		if (user._id) {
			return <Redirect to="/" />;
		}
		return (
			<div className="login">
				<header className="login-header">
					<img src={logo} alt="logo" />
					<h1>React项目:后台管理系统</h1>
				</header>
				<section className="login-content">
					<h2>用户登录</h2>
					<NormalLoginForm {...this.props} />
				</section>
			</div>
		);
	}
}
const NormalLoginForm = (props) => {
	const onFinish = async (values) => {
		//提交表单且数据验证成功后回调事件
		console.log("Received values of form: ", values);
		//请求登录
		if (values) {
			const { username, password } = values;
			const result = await reqLogin(username, password);
			// const result = response.data; //{status:0, data:user} {status:1, msg:'xxx'}
			const user = result.data;
			memoryUtils.user = user; //保存在内存中
			storageUtils.saveUser(user); //保存在localstorage里
			if (result.status === 0) {
				message.success("登录成功");
				props.history.replace("/");
			} else {
				message.error(result.msg);
			}
		} else {
			console.log("检验失败!");
		}
	};

	return (
		<Form
			onFinish={onFinish}
			className="login-form"
			initialValues={{
				username: "", //默认值
			}}
		>
			<Form.Item
				name="username"
				rules={[
					// 声明式验证: 直接使用别人定义好的验证规则进行验证
					{ required: true, whitespace: true, message: "用户名必须输入" },
					{ min: 4, message: "用户名至少4位" },
					{ max: 12, message: "用户名最多12位" },
					{
						pattern: /^\w+$/,
						message: "用户名必须是英文、数字或下划线组成",
					},
				]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="用户名"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						validator: (_, value) =>
							value ? Promise.resolve() : Promise.reject("密码必须输入"),
					},
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="密码"
				/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};
export default Login;
