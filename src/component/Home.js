import React from 'react';
import axios from 'axios'
import {url} from '../config.js'
import { Tabs,message,Button,BackTop} from 'antd';
import Topics from './Topics.js' 
const TabPane = Tabs.TabPane;

export default class Home extends React.Component{
	constructor(){
		super()
		this.state={
			data:{
				all:{topics:[], page:1},
				good:{topics:[], page:1},
				share:{topics:[], page:1},
				ask:{topics:[], page:1},
				job:{topics:[], page:1}
			},
			tab:'all'
		}
	}
	getData(tab,page){
		console.log(page)
		axios.get(`${url}/topics?limit=25&tab=${tab==='all'?'':tab}&page=${page}`)
		.then(res=>{
			let newData=this.state.data
			//newData[tab].topics=[...newData[tab].topics,...res.data.data]保存之前刷新的数据，再向里面添加
			newData[tab].topics=res.data.data
			newData[tab].page=page;
			this.setState({
				data:newData
			})
		})
		.catch(err=>message.error("数据请求失败，请重试"))
	}
	componentDidMount(){
		this.getData('all',1)//this?
	}
	handleChange(key){
		// console.log(key)
		this.setState({tab:key})
		if(this.state.data[key].topics.length===0){
			this.getData(key,1)
		}else{
			return//?
		}

	}
	loadMore(tab){
		// console.log(tab)
		this.getData(tab,this.state.data[tab].page+1)

	}
	render(){
		console.log(this.state.data)
		let {data,tab}=this.state
		
		return(
			<div>
				<Tabs defaultActiveKey="all" onChange={this.handleChange.bind(this)} >
			    <TabPane tab="全部" key="all">
			    	<Topics data={data.all.topics}/>
			    </TabPane>
			    <TabPane tab="精华" key="good">
			    	<Topics data={data.good.topics}/>
			    </TabPane>
			    <TabPane tab="分享" key="share">
			    	<Topics data={data.share.topics}/>
			    </TabPane>
			    <TabPane tab="问答" key="ask">
			    	<Topics data={data.ask.topics}/>
			    </TabPane>
			    <TabPane tab="招聘" key="job">
			    	<Topics data={data.job.topics}/>
			    </TabPane>
		  	</Tabs>
		  	<Button type='primary' style={{width:'100%'}} onClick={this.loadMore.bind(this,tab)}>MORE</Button>
		  	<BackTop/>
			</div>
		)
	}
}