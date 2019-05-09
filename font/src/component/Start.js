import React, { Component } from 'react'
import Socket from '../services/socket'
import start_img from '../images/start.png'
import "./start.css";

export default class Blog extends Component {
	render() {
		return (
			<div id="start">
				<img src={start_img} id='start_img' ></img>
				<div id="name-input">
					<input type="text" placeholder="type your name here" ref='name'/>
            		<input type="submit" value="send" onClick={this.direct} ></input>
				</div>
			</div>
		)
	}
	direct= () =>{
		Socket.set_socket(4000);
		Socket.set_name(this.refs['name'].value);
		let socket = Socket.get_socket();
		socket.emit('new_people',this.refs['name'].value);
		socket.on('goto',index =>{
			let history = this.props.history;
			history.push(index);
		})
	}

	componentDidMount() {
		this.refs['name'].addEventListener("keydown", event => {
			if (event.which === 13 && event.shiftKey === false) {
				event.preventDefault();
				Socket.set_socket(4000);
				Socket.set_name(this.refs['name'].value);
				let socket = Socket.get_socket();
				socket.emit('new_people',this.refs['name'].value);
				socket.on('goto',index =>{
					let history = this.props.history;
					history.push(index);
				})
			}
		});
	}
}