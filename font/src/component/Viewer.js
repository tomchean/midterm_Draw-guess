import React from "react";
import Watch from "../services/watch";
import "./Viewer.css";
import Rank from './Rank';
import Socket from '../services/socket'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      time : 60,
    }
    this.status = 0;
    this.clock = null;
    this.name =Socket.get_name();
    this.socket = Socket.get_socket();
    this.watch = new Watch(this.socket);
    this.socket.on('wrong',()=>navigator.vibrate(300));
    this.socket.on('right',()=>{
      this.socket.emit('update_people');
      this.status =1;
    })
    this.socket.on('goto',index =>{
      let history = this.props.history;
      history.push(index);
    })
    
    this.socket.on('timer_start',()=>{
      this.status =0 ;
      this.clock = setInterval(()=>this.tick(),1000);
    });

    this.socket.on('reset_timer',()=>{
      if(this.clock !== null){
        clearInterval(this.clock);
        this.clock = null;
        this.setState({
        time: 60
        })
      }
    })

  }

  tick(){
    if(this.state.time===0){
      clearInterval(this.clock);
      this.clock = null;
      this.setState({
        time: 60
      })
      return;
    }
    if(this._isMounted){
      this.setState({
        time: this.state.time-1,
      })
    }
  }
  send_answer= (ans) => {
    if(this.status ===0){
      this.socket.emit('answer',{
        ans:this.refs['answer'].value,
        name:this.name
      });
    }    
    this.refs['answer'].value='';
  }

  render() {
    return (
      <div className="canvas_root" >
        <div className="clock">{this.state.time}</div>
        <div className="canvas-wrap" ref='canvas-wrap'></div>     
        <div className="answer">
            <input type="text"  placeholder="type answer here" ref='answer'/>
            <input type="submit" value="send" onClick={this.send_answer} ></input>
        </div>        
        <div id="rank_con">
            <Rank socket={this.socket}> </Rank>
        </div>   
      </div>           
    );
  }

  componentDidMount() {
    this.watch.init(this.refs['canvas-wrap']);
    this.refs['answer'].addEventListener("keydown", event => {
        if (event.which === 13 && event.shiftKey === false) {
            this.send_answer();
            event.preventDefault();
        }
    });
    this._isMounted = true;
  }

  componentWillUnmount(){
    if(this.clock !== null){
      clearInterval(this.clock);
    }
    this._isMounted = false;
  }
}
