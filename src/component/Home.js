import React from 'react';

export default class Home extends React.Component{
	constructor(){
		super()
		this.state={
			data:{
				all:{topics:[],page:1},
				good:{topics:[],page:1},
				share:{topics:[],page:1},
				job:{topics:[],page:1},
				ask:{topics:[],page:1}
			},
			tab:'all'
		}
	}
	render(){
		return(
			<div>
				Home
			</div>
		)
	}
}