import React from 'react';
import axios from 'axios'
import {url} from '../config.js'
import {message,Spin,Card,Avatar,Input,Button,Icon } from 'antd'
import moment from 'moment';

export default class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data:null,
			reply:'',
			replyPerson:''
		}
	}
	getData(){
		let id = this.props.match.params.id;
		axios.get(`${url}/topic/${id}`)
			.then(res=> this.setState({data: res.data.data}))
			.catch(err=> message.error('数据请求失败'))
	}
	componentDidMount(){
		let id=this.props.match.params.id
		axios.get(`${url}/topic/${id}`)
		.then(res=> this.setState({data:res.data.data}))
		.catch(err=>message.error('文章加载失败'))


	}
	handleReply(){
		if(sessionStorage.accesstoken){
			var accesstoken=sessionStorage.accesstoken
		}else{
			message.error('请先登录')
		}
		let content=this.state.reply
		let id=this.state.data.id
		axios.post(`${url}/topic/${id}/replies`,{accesstoken,content})
		.then(res=>console.log(res))
		.catch(message.error('评论失败'))
	}
	handleLike(reply_id){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		axios.post(`${url}/reply/${reply_id}/ups`, {accesstoken})
			.then( res => this.getData() )
			.catch( err => message.error('评论失败'))
	}
	handleReplyPerson(){

	}
	render(){
		// console.log(this.props)
		let {data,reply}=this.state
		console.log(data)
		return(
			<div style={{padding:'10px'}}>
				<Card loading={!data}>
					{
						data? (
							<div>
								<h1 style={{textAlign:'center'}}>{data.title}</h1>
								<div className='topic-desc'>
									<Avatar src={data.author.avatar_url}/>
									<span>回复量：{data.reply_count}</span>&nbsp;&nbsp;
									<span>访问量：{data.visit_count}</span>
								</div>
								<p dangerouslySetInnerHTML={{__html:data.content}}  className='topic-wrap'/>
								<h1>全部回复:</h1>
								{
									data.replies.map(item=>(
										<div className='comments' key={item.id}>
											<Avatar src={item.author.avatar_url}/>
											<div className='comments-right'>
												<div className='comments-header'>
													<p>{item.author.loginname}:{moment(item.create_at).fromNow()}</p>
													<span>{item.replies}</span>
													<span>
														<Icon className='icon' type="like" onClick={this.handleLike.bind(this,item.id)}/>{item.ups.length===0? '':item.ups.length}&nbsp;
														<Icon type="message" onClick={this.handleReplyPerson.bind(this,item)}/>
													</span>
													
												</div>
												<div dangerouslySetInnerHTML={{__html:item.content}}/>
											</div>
										</div>
									))
								}

								<Card title="添加回复：" >
									<Input type='textarea' placeholder='请输入评论内容' rows={4} value={reply} style={{width:'100%'}} onChange={(e)=>this.setState({reply:e.target.value})}/>
									<Button type='primary' onClick={this.handleReply.bind(this,'reply')}>提交</Button>
								</Card>

							</div>
							):null
					}
				</Card>
			</div>
		)
	}
}