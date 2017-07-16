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
			replyInfo:null,
			collect:false
			

		}
	}
	getData(){
		let id = this.props.match.params.id;
		axios.get(`${url}/topic/${id}`)
			.then(res=> this.setState({data: res.data.data}))
			.catch(err=> message.error('文章加载失败'))

	}
	componentWillMount(){
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
		/*.catch(message.error('评论失败'))*/
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
	/*handleCollect(){
		var topic_id = this.props.match.params.id;
		console.log(this.props)
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		let collect=this.state.data.is_collect
		if(!collect){
			axios.post(`${url}/topic_collect/collect`,{accesstoken,topic_id })
			.then(res=>(this.setState({collect:'取消收藏'})))
			.catch(err=>message.error('收藏失败'))
		}else{
			axios.post(`${url}/topic_collect/de_collec`,{accesstoken,topic_id })
			.then(res=>(this.setState({collect:'收藏'})))
			.catch(err=>message.error('取消收藏失败'))
		}
		
		console.log(this.state.data)
		console.log(collect)

	}*/
	handleCollect(){
		
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		var topic_id = this.props.match.params.id;
		axios.post(`${url}/topic_collect/collect`,{accesstoken,topic_id })
			.then(res=>(this.setState({collect:true})))
			.catch(err=>message.error('收藏失败'))
			let wait=this.state.wait
			console.log(wait)
	}
	showReplyPerson(replyPerson){
		// console.log(replyPerson)
		this.setState({visible:true,replyInfo:replyPerson,replyPerson:`@${replyPerson.author.loginname} `})
	}
	
	render(){
		// console.log(this.props)
		let {data,reply,visible,replyPerson,replyInfo,collect}=this.state
		
		console.log(data)
		return(
			<div style={{padding:'10px'}}>
				<Card loading={!data}>
					{
						data? (
							<div>
								<h1 style={{textAlign:'center'}}>{data.title}</h1>

								<Button type='primary' style={{float:'right',backgroud:'lightgreen'}} onClick={this.handleCollect.bind(this)}>
									{collect? '已收藏' :'收藏'}
								</Button>
								 
								
								
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

