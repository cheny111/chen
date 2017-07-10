import React from 'react';
import axios from 'axios'
import {url} from '../config.js'
import { Tabs,message } from 'antd';
const TabPane = Tabs.TabPane;
import Topics from './Topics.js' 

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
			}
		}
	}
	getData(tab,page){
		axios.get(`${url}/topics?limit=15&tab=${tab==='all'?'':tab}&page=${page}`)
		.then(res=>{
			let newData=this.state.data
			newData[tab].topics=[...newData[tab].topics,...res.data.data]//保存之前刷新的数据，再向里面添加
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
		if(this.state.data[key].topics.length===0){
			this.getData(key,1)
		}else{
			return//?
		}

	}
	render(){
		console.log(this.state.data)
		let {data}=this.state
		
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
			</div>
		)
	}
}