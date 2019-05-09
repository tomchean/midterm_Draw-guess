import React from "react";
import "./Viewer.css";
import "./Rank.css";

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.socket = this.props.socket;
        this.state = {
            people :[],
            message:[],
        };
        this.people =[];
        
        this.socket.on('update_people',data=>{
            if(this._isMounted){
                var people_new =[];
                var index =0
                for (let x = 0; x < data.names.length; x++) {
                    index +=1;
                    people_new.push( <tr style={{ width:'100%'}} key={index}><td style={{ width:'60%'}}>{data.names[x]}</td><td style={{ width:'40%'}}>{data.scores[x]}</td></tr>);
                }
                this.setState({ people : people_new });
            }
        })
        this.socket.emit('update_people')
        this.socket.emit('update_message');
        this.socket.on('update_message',message=>{
            if(this._isMounted){
                var message_new =[];
                var index =0
                for (let x = 0; x < message.length; x++) {
                    index +=1;
                    message_new.push( <tr style={{ width:'100%'}} key={index}><td style={{margin: '0 ,auto'}}>{message[x]}</td></tr>);
                }
                this.setState({ message : message_new });
            }
        })
    }


    render(){
        return(
            <div id='rank_div'>
                <div id="rank">
                    <table style={{width:'100%'}}>
                        <tbody style={{width:'100%'}}>
                            {this.state.people}
                        </tbody>
                    </table>    
                </div>
                
                <div id="message">
                    <table style={{width:'100%'}}>
                        <tbody style={{width:'100%'}}>
                            {this.state.message}
                        </tbody>
                    </table>         
                </div>
                    
            </div> 
        )
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
}