import React from 'react';
import axios from 'axios';
import { Button,Modal,Input,message,Menu, Dropdown,Avatar } from 'antd'
import {url} from '../config.js';


export default class Header extends React.Component{
	constructor(){
		super()
		this.state={
			isLogin:false,
			visible:false,
			confirmLoading:false,
			input:'d1b106e5-99ed-40d2-94ef-72f6a78f433f',
			user:null
			
		}
	}
	handleOk(){
		this.setState({confirmLoading:true})
		let accesstoken=this.state.input;
		axios.post(`${url}/accesstoken`,{accesstoken})
		.then(res=>{
			console.log(res)
			message.success('登录成功')
			this.setState({
				visible:false,
				confirmLoading:false,
				isLogin:true,
				input:'',
				user:res.data
			})
			sessionStorage.accesstoken=accesstoken
		})
		.catch(err=>{
			message.error('登录失败，请重试')
			this.setState({
				confirmLoading:false,
				input:''
			})
		})
	}
	handleLogout(){
		this.setState({
			user:null,
			isLogin:false
		})
		sessionStorage.removeItem('accesstoken')
	}
	render(){
		let {isLogin,visible,input,confirmLoading,user}=this.state
		console.log(user)
		const menu = !isLogin? <p>123</p> :(
		  <Menu>
		    <Menu.Item>
		      <h3>{user.loginname}</h3>
		    </Menu.Item>
		    <Menu.Item>
		    	<a href="#">个人中心</a>
		    </Menu.Item>
		    <Menu.Item>
		      <Button type="danger" onClick={this.handleLogout.bind(this)}>退出</Button>
		    </Menu.Item>
		  </Menu>
		);
		return(
			<div className="header">
				<h1>cnode中文社区</h1>
				{
					isLogin? 
					<div>
						<Dropdown overlay={menu}>
					    
					     <Avatar src={user.avatar_url} />
					  </Dropdown>
					</div>
					:
					<div>
						<Button type="primary" onClick={()=>this.setState({visible:true})}>登录</Button>
						<Modal
		          title="请登录"
		          visible={this.state.visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={()=>this.setState({visible:false})}
		          cancelText='取消'
		          okText="登录"
		          confirmLoading={confirmLoading}
		        >
		          <Input placeholder='accesstoken'  value={input} onChange={(e)=>this.setState({input:e.target.value})}/>
		        </Modal>
					</div>
				}
				
			</div>
		)
	}
}