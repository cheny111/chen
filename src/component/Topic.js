import React from 'react';
import axios from 'axios'
import {url} from '../config.js'
import {message,Spin,Card,Avatar,Input,Button,Icon,Modal,BackTop } from 'antd'
import moment from 'moment';

export default class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data:null,
			reply:'',
			replyPerson:'',
			visible:false,
			replyInfo:null
		}
	}
	getData(){
		let id = this.props.match.params.id;
		axios.get(`${url}/topic/${id}`)
			.then(res=> this.setState({data: res.data.data}))
			.catch(err=> message.error('文章加载失败'))
	}
	componentDidMount(){
		
		this.getData()
	}
	handleReply(type){
		if(sessionStorage.accesstoken){
			var accesstoken=sessionStorage.accesstoken
		}else{
			message.error('请先登录')
		}
		if(type==='reply'){
			var content=this.state.reply
		}else{
			var content=this.state.replyPerson
		}
		let data={accesstoken,content}
		
		if(type==='replyPerson'){
			data.reply_id=this.state.replyInfo.id
		}
		let id=this.state.data.id
		axios.post(`${url}/topic/${id}/replies`,data)
		.then(res=>{
			this.setState({reply:''})
			this.getData()
			if(type==='replyPerson'){
				this.setState({visible:false})
			}
		})
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
			.catch( err => message.error('点赞失败'))
	}
	showReplyPerson(replyPerson){
		// console.log(replyPerson)
		this.setState({visible:true,replyInfo:replyPerson,replyPerson:`@${replyPerson.author.loginname} `})
	}
	
	render(){
		// console.log(this.props)
		let {data,reply,visible,replyPerson,replyInfo}=this.state
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
														<Icon type="message" onClick={this.showReplyPerson.bind(this,item)}/>
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
				<Modal
          title={replyInfo? `回复${replyInfo.author.loginname}`: "回复内容"}
          visible={this.state.visible}
          onOk={this.handleReply.bind(this,'replyPerson')}
          onCancel={()=>this.setState({visible:false})}
        >
          <Input type='textarea' placeholder='请输入评论内容' rows={4} value={replyPerson} style={{width:'100%'}} onChange={(e)=>this.setState({replyPerson:e.target.value})} />
					
        </Modal>
        <BackTop/>
			</div>
		)
	}
}

/*export default class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data: null,
			comment: '',
			reply:'',
			visible: false,
			replyInfo: null
		}
	}
	getData(){
		let id = this.props.match.params.id;
		axios.get(`${url}/topic/${id}`)
			.then(res=> this.setState({data: res.data.data}))
			.catch(err=> message.error('数据请求失败'))
	}
	componentDidMount(){
		this.getData()
	}
	handleComment(type){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		if (type==='comment') {
			var content = this.state.comment;
		}else{
			var content = this.state.reply;
		}
		let data = {accesstoken, content }
		let id = this.state.data.id;
		axios.post(`${url}/topic/${id}/replies`, data)
			.then(res=> {
				this.setState({comment: ''})
				this.getData()
				if (type==='reply') this.setState({visible: false});
			})
			.catch( err => message.error('评论失败'))
	}
	showReply(reply){
		// console.log(reply)
		this.setState({visible: true, replyInfo: reply, reply: `@${reply.author.loginname} `})
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
	render(){
		let {data, comment, visible, reply, replyInfo} = this.state
		// console.log(data)
		return(
			<div style={{padding:'10px'}}>
				<Card loading={!data}>
					{
						data ? (
							<div>
								<h1 style={{textAlign: 'center'}}>{data.title}</h1>
								<div className='topic-desc'>
									<Avatar src={data.author.avatar_url}/>
									<span>回复量：{data.reply_count}</span>&nbsp;&nbsp;
									<span>阅读量：{data.visit_count}</span>
								</div>
								<div dangerouslySetInnerHTML={{__html: data.content}} className='topic-wrap'/>

								<h1>发表评论：</h1>
								<Input type="textarea" rows={4} value={comment} onChange={e=>this.setState({comment: e.target.value})} placeholder='留下您的评论' />
								<Button type='primary' onClick={this.handleComment.bind(this, 'comment')}>提交</Button>

								<h1>全部回复：</h1>
								{
									data.replies.map(item=>(
										<div className='comments' key={item.id}>
											<Avatar src={item.author.avatar_url} />
											<div className='comments-right'>
												<div className='comments-header'>
													<span>{item.author.loginname}·{moment(item.create_at).fromNow()}</span>
													<span>
														<Icon type="like" onClick={this.handleLike.bind(this, item.id)}/>{item.ups.length}&nbsp;&nbsp;
														<Icon type="message" onClick={this.showReply.bind(this, item)}/>
													</span>
												</div>
												<div dangerouslySetInnerHTML={{__html: item.content}} />
											</div>
										</div>
									))
								}
							</div>
						) : null
					}
				</Card>
				<Modal
          title={replyInfo? `回复：${replyInfo.author.loginname}` : '回复：'}
          visible={visible}
          onOk={this.handleComment.bind(this,'reply')}
          onCancel={()=>this.setState({visible: false})}
        >
          <Input type="textarea" rows={4} value={reply} onChange={e=>this.setState({reply: e.target.value})} placeholder='留下您的评论' ref={input=> this.input = input}/>
        </Modal>
				<BackTop />
			</div>
		)
	}
}
*/