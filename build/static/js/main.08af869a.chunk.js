(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,n){},3:function(e,t,n){"use strict";(function(e){var a=n(45),i=n.n(a);t.a={set_socket:function(t){e.socket=i()()},get_socket:function(){return e.socket},set_name:function(t){e.name=t},get_name:function(){return e.name}}}).call(this,n(14))},46:function(e,t,n){e.exports=n.p+"static/media/start.5f596120.png"},50:function(e,t,n){e.exports=n(96)},55:function(e,t,n){},56:function(e,t,n){},83:function(e,t){},86:function(e,t,n){},87:function(e,t,n){},96:function(e,t,n){"use strict";n.r(t);var a,i=n(0),s=n.n(i),c=n(44),o=n.n(c),r=n(2),l=n(4),u=n(9),h=n(8),d=n(10),m=[],p=[],f=[],v={notFirst:!1},k=null,g=document.createElement("canvas"),y=g.getContext("2d"),w=0,b=0;function _(e,t,n){m.push(e),p.push(t),f.push(n)}function E(){for(;m.length>0;)v.bx=v.x,v.by=v.y,v.x=m.pop(),v.y=p.pop(),v.drag=f.pop(),y.beginPath(),v.drag&&v.notFirst?y.moveTo(v.bx,v.by):(v.notFirst=!0,y.moveTo(v.x-1,v.y)),y.lineTo(v.x,v.y),y.closePath(),y.stroke()}function x(){y.rect(0,0,w,b),y.fillStyle="#f2f2f2",y.fill(),y.strokeStyle="#666",y.lineJoin="round",y.lineWidth=2,f=[],m=[],p=[]}var O=function e(t){var n=this;Object(r.a)(this,e),this.init=function(e,t){w=(k=e).clientWidth,b=k.clientHeight,g.setAttribute("width",w),g.setAttribute("height",b),g.style.boxSizing="border-box",k.appendChild(g),x(),setTimeout(function(){n.listen(t)},1500)},this.listen=function(e){var t=g.getBoundingClientRect().left,i=g.getBoundingClientRect().top;k.addEventListener("touchstart",function(s){a=!0,e&&(n.className=e),s.touches&&(s=s.touches[0]),_(s.pageX-t,s.pageY-i),n.send_click(s.pageX-t,s.pageY-i),E()}),k.addEventListener("touchmove",function(e){a&&(e.touches&&(e=e.touches[0]),_(e.pageX-t,e.pageY-i,!0),n.send_click(e.pageX-t,e.pageY-i,!0),E())}),k.addEventListener("touchend",function(e){a=!1}),k.addEventListener("mousedown",function(s){a=!0,e&&(n.className=e),_(s.pageX-t,s.pageY-i),n.send_click(s.pageX-t,s.pageY-i),E()}),k.addEventListener("mousemove",function(e){a&&(_(e.pageX-t,e.pageY-i,!0),n.send_click(e.pageX-t,e.pageY-i,!0),E())}),k.addEventListener("mouseup",function(e){a=!1}),k.addEventListener("mouseleave",function(e){a=!1})},this.send_click=function(e,t,a){n.socket.emit("click",{x:e,y:t,drag:a})},this.change_bursh=function(e){y.lineWidth=e.target.value,n.socket.emit("change_brush",e.target.value)},this.change_color=function(e){y.strokeStyle=e.target.value,n.socket.emit("change_color",e.target.value)},this.clear=function(){var e={width:y.lineWidth,color:y.strokeStyle};g.width=g.width,g.height=g.height,x(),y.lineWidth=e.width,y.strokeStyle=e.color,n.socket.emit("clear")},this.socket=t,this.socket.on("update_cor",function(e){m.push(e.x),p.push(e.y),f.push(e.drag),E()}),this.socket.on("change_brush",function(e){y.lineWidth=e}),this.socket.on("change_color",function(e){y.strokeStyle=e}),this.socket.on("clear",function(e){var t={width:y.lineWidth,color:y.strokeStyle};g.width=g.width,g.height=g.height,x(),y.lineWidth=t.width,y.strokeStyle=t.color})},j=(n(55),n(29),n(56),function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).socket=n.props.socket,n.state={people:[],message:[]},n.people=[],n.socket.on("update_people",function(e){if(n._isMounted){for(var t=[],a=0,i=0;i<e.names.length;i++)a+=1,e.index!==i?t.push(s.a.createElement("tr",{style:{width:"100%"},key:a},s.a.createElement("td",{style:{width:"60%"}},e.names[i]),s.a.createElement("td",{style:{width:"40%"}},e.scores[i]))):t.push(s.a.createElement("tr",{style:{width:"100%"},key:a},s.a.createElement("td",{style:{width:"60%"}},"\u270d "+e.names[i]),s.a.createElement("td",{style:{width:"40%"}},e.scores[i])));n.setState({people:t})}}),n.socket.emit("update_people"),n.socket.emit("update_message"),n.socket.on("update_message",function(e){if(n._isMounted){for(var t=[],a=0,i=e.length-1;i>=0;i--)a+=1,t.push(s.a.createElement("tr",{style:{width:"100%"},key:a},s.a.createElement("td",{style:{textAlign:"left"}},e[i].name+" : "+e[i].ans)));n.setState({message:t})}}),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"rank_div"},s.a.createElement("div",{id:"rank"},s.a.createElement("table",{style:{width:"100%"}},s.a.createElement("tbody",{style:{width:"100%"}},this.state.people))),s.a.createElement("div",{id:"message"},s.a.createElement("table",{style:{width:"100%"}},s.a.createElement("tbody",{style:{width:"100%"}},this.state.message))))}},{key:"componentDidMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}}]),t}(s.a.Component)),S=n(3),W=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).send_answer=function(){0===n.status?(n.socket.emit("update_ans",n.refs.answer.value),n.refs.answer.value="",n.clock=setInterval(function(){return n.tick()},1e3),n.status=1):(n.socket.emit("answer",{ans:n.refs.answer.value,name:n.name}),n.refs.answer.value="")},n.name=S.a.get_name(),n.socket=S.a.get_socket(),n.draw=new O(n.socket),n.state={time:60},n.status=0,n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"tick",value:function(){if(0===this.state.time)return clearInterval(this.clock),this.clock=null,this.setState({time:60}),void this.socket.emit("change_view");this._isMounted&&this.setState({time:this.state.time-1})}},{key:"render",value:function(){return s.a.createElement("div",{className:"canvas_root"},s.a.createElement("div",{className:"clock"},this.state.time),s.a.createElement("div",{className:"canvas-wrap-p",ref:"canvas-wrap"}),s.a.createElement("div",{className:"canvas_tool"},s.a.createElement("button",{onClick:this.draw.clear},"clear"),s.a.createElement("input",{className:"color-picker",type:"color",name:"favcolor",ref:"color-picker"}),s.a.createElement("input",{className:"brush-size",type:"range",name:"points",ref:"brush-size",min:"1",max:"10",step:"0.5"})),s.a.createElement("div",{className:"answer-p"},s.a.createElement("input",{type:"text",placeholder:"update answer here",ref:"answer"}),s.a.createElement("input",{type:"submit",value:"send",onClick:this.send_answer})),s.a.createElement("div",{id:"rank-p"},s.a.createElement(j,{socket:this.socket}," ")))}},{key:"componentDidMount",value:function(){var e=this;this.refs["brush-size"].addEventListener("change",this.draw.change_bursh,!1),this.refs["brush-size"].value=2,this.refs["color-picker"].addEventListener("change",this.draw.change_color,!1),this.draw.init(this.refs["canvas-wrap"]),this.refs.answer.addEventListener("keydown",function(t){13===t.which&&!1===t.shiftKey&&(t.preventDefault(),e.send_answer())}),this._isMounted=!0}},{key:"componentWillUnmount",value:function(){null!==this.clock&&clearInterval(this.clock),this._isMounted=!1}}]),t}(s.a.Component),C=(n(86),[]),M=[],N=[],L={notFirst:!1},I=null,X=document.createElement("canvas"),D=X.getContext("2d"),Y=0,A=0;function T(){D.rect(0,0,Y,A),D.fillStyle="#f2f2f2",D.fill(),D.strokeStyle="#666",D.lineJoin="round",D.lineWidth=2,N=[],C=[],M=[]}var F=function(){function e(t){var n=this;Object(r.a)(this,e),this.init=function(e,t){Y=(I=e).clientWidth,A=I.clientHeight,X.setAttribute("width",Y),X.setAttribute("height",A),I.appendChild(X),T()},this.change_bursh=function(e){D.lineWidth=e.target.value,n.socket.emit("change_brush",e.target.value)},this.change_color=function(e){D.strokeStyle=e.target.value,n.socket.emit("change_color",e.target.value)},this.socket=t,this.socket.on("update_cor",function(e){C.push(e.x),M.push(e.y),N.push(e.drag),function(){for(;C.length>0;)L.bx=L.x,L.by=L.y,L.x=C.pop(),L.y=M.pop(),L.drag=N.pop(),D.beginPath(),L.drag&&L.notFirst?D.moveTo(L.bx,L.by):(L.notFirst=!0,D.moveTo(L.x-1,L.y)),D.lineTo(L.x,L.y),D.closePath(),D.stroke()}()}),this.socket.on("change_brush",function(e){D.lineWidth=e}),this.socket.on("change_color",function(e){D.strokeStyle=e}),this.socket.on("clear",function(e){var t={width:D.lineWidth,color:D.strokeStyle};X.width=X.width,X.height=X.height,T(),D.lineWidth=t.width,D.strokeStyle=t.color})}return Object(l.a)(e,[{key:"clear",value:function(){X.width=X.width,X.height=X.height,T()}}]),e}(),z=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).send_answer=function(e){0===n.status&&n.socket.emit("answer",{ans:n.refs.answer.value,name:n.name}),n.refs.answer.value=""},n.state={time:60},n.status=0,n.clock=null,n.name=S.a.get_name(),n.socket=S.a.get_socket(),n.watch=new F(n.socket),n.socket.on("wrong",function(){return navigator.vibrate(300)}),n.socket.on("right",function(){n.socket.emit("update_people"),n.status=1}),n.socket.on("goto",function(e){n.props.history.push(e)}),n.socket.on("timer_start",function(){n.status=0,n.clock=setInterval(function(){return n.tick()},1e3)}),n.socket.on("reset_timer",function(){null!==n.clock&&(clearInterval(n.clock),n.clock=null,n.setState({time:60}))}),n.socket.on("reset",function(){!0===n._isMounted&&(n.watch.clear(),null!==n.clock&&(clearInterval(n.clock),n.clock=null,n.setState({time:60})),n.status=0)}),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"tick",value:function(){if(0===this.state.time)return clearInterval(this.clock),this.clock=null,void this.setState({time:60});this._isMounted&&this.setState({time:this.state.time-1})}},{key:"render",value:function(){return s.a.createElement("div",{className:"canvas_root"},s.a.createElement("div",{className:"clock"},this.state.time),s.a.createElement("div",{className:"canvas-wrap",ref:"canvas-wrap"}),s.a.createElement("div",{className:"answer"},s.a.createElement("input",{type:"text",placeholder:"type answer here",ref:"answer"}),s.a.createElement("input",{type:"submit",value:"send",onClick:this.send_answer})),s.a.createElement("div",{id:"rank_con"},s.a.createElement(j,{socket:this.socket}," ")))}},{key:"componentDidMount",value:function(){var e=this;this.watch.init(this.refs["canvas-wrap"]),this.refs.answer.addEventListener("keydown",function(t){13===t.which&&!1===t.shiftKey&&(e.send_answer(),t.preventDefault())}),this._isMounted=!0}},{key:"componentWillUnmount",value:function(){null!==this.clock&&clearInterval(this.clock),this._isMounted=!1}}]),t}(s.a.Component),P=n(46),U=n.n(P),J=(n(87),function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(i)))).direct=function(){S.a.set_socket(4e3),S.a.set_name(n.refs.name.value);var e=S.a.get_socket();e.emit("new_people",n.refs.name.value),e.on("goto",function(e){console.log("goto"+e),n.props.history.push(e)})},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"start"},s.a.createElement("img",{src:U.a,id:"start_img"}),s.a.createElement("div",{id:"name-input"},s.a.createElement("input",{type:"text",placeholder:"type your name here",ref:"name"}),s.a.createElement("input",{type:"submit",value:"send",onClick:this.direct})))}},{key:"componentDidMount",value:function(){var e=this;this.refs.name.addEventListener("keydown",function(t){if(13===t.which&&!1===t.shiftKey){t.preventDefault(),S.a.set_socket(4e3),S.a.set_name(e.refs.name.value);var n=S.a.get_socket();n.emit("new_people",e.refs.name.value),n.on("goto",function(t){e.props.history.push(t)})}})}}]),t}(i.Component)),B=n(47),H=n(11),K=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement(B.a,null,s.a.createElement("div",{className:"component-app"},s.a.createElement(H.c,null,s.a.createElement(H.a,{path:"/painter",component:W}),s.a.createElement(H.a,{path:"/viewer",component:z}),s.a.createElement(H.a,{path:"/",component:J}))))}}]),t}(s.a.Component),R=window.innerHeight,q=window.innerWidth;q>360&&(q=360,R>640&&(R=640)),document.body.style.height=R+"px",document.body.style.width=q+"px",!0===!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&document.body.addEventListener("touchmove",function(e){e.preventDefault()},{passive:!1}),o.a.render(s.a.createElement(K,null),document.getElementById("container"))}},[[50,1,2]]]);
//# sourceMappingURL=main.08af869a.chunk.js.map