import React from 'react';
import ReactModal from 'react-modal';

import './random-pick-modal.css';

const customStyles={
	content:{
		top:'50%',
		left:'50%',
		right:'auto',
		bottom:'auto',
		marginRight:'-50%',
		transform:'translate(-50%,-50%)'
	}
}
ReactModal.setAppElement('#root');

export default class RandomPickModal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showModal:this.props.showModal
		};
		this.closeModal=this.closeModal.bind(this);
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			showModal:nextProps.showModal,
			pick:nextProps.pick
		});
	}

	closeModal(){
		this.setState({showModal:false})
	}

	render(){
		let modalContent;
		if(!this.state.pick){
			modalContent=(<div className="lds-circle"></div>);
		}else{
			modalContent=(
				<div>
					<h3>{this.state.pick.what}</h3>
					<p>{this.state.pick.where}</p>
					<p>{this.state.pick.type}</p>
					<p>{this.state.pick.details}</p>
				</div>
			);
		}
		return(
			<ReactModal
				isOpen={this.state.showModal}
				onRequestClose={this.closeModal}
				style={customStyles}
				contentLabel="activity picked randomly"
			>
				{modalContent}
				<br />
				<button onClick={this.closeModal}>Close</button>
			</ReactModal>
		);
	}
}
