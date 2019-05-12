import React from "react";
import Draw from "../services/draw";
import "./Canvas.css";
import Rank from './Rank';
import Socket from '../services/socket'


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.name =Socket.get_name();
    this.socket = Socket.get_socket();
    this.draw = new Draw(this.socket );
    this.state ={
      time : 60,
    }
    this.status =0;
  }

  send_answer = () => {
    if(this.status===0){
      this.socket.emit('update_ans',this.refs['answer'].value);
      this.refs['answer'].value ='';
      this.clock = setInterval(()=>this.tick(),1000);
      this.status=1;
    }
    else{
      this.socket.emit('answer',{
        ans:this.refs['answer'].value,
        name:this.name
      });
      this.refs['answer'].value ='';
    }
  }

  tick(){
    if(this.state.time===0){
      clearInterval(this.clock);
      this.clock = null;
      this.setState({
        time: 60
      })
      this.socket.emit('change_view');
      return;
    }
    if(this._isMounted){
      this.setState({
        time: this.state.time-1,
      })
    }
  }

  render() {
    return (
      <div className="canvas_root" >
        <div className = 'clock'>{this.state.time}</div>
        <div className="canvas-wrap-p" ref='canvas-wrap'></div>     
        <div className="canvas_tool">
          <button onClick={this.draw.clear}>clear</button>
          <input className="color-picker" type="color" name="favcolor" ref='color-picker'/>
          <input className="brush-size"type="range" name="points" ref='brush-size' min="1" max="10" step="0.5"/>
        </div>
        <div className="answer-p">
            <input type="text" placeholder="update answer here" ref='answer'/>
            <input type="submit" value="send" onClick={this.send_answer} ></input>
        </div>        
        <div id="rank-p">
          <Rank socket={this.socket}> </Rank>
        </div>   
      </div>           
    );
  }

  componentDidMount() {
    this.refs['brush-size'].addEventListener("change", this.draw.change_bursh, false);
    this.refs['brush-size'].value = 2;
    this.refs['color-picker'].addEventListener("change", this.draw.change_color, false);
    this.draw.init(this.refs['canvas-wrap']);
    this.refs['answer'].addEventListener("keydown", event => {
      if (event.which === 13 && event.shiftKey === false) {
          event.preventDefault();
          this.send_answer();        
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
