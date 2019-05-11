import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";

var height = window.innerHeight 
var width = window.innerWidth 
if (width >360){
    width = 360
    if(height > 640){
        height = 640
    }
}

document.body.style.height = height+'px'
document.body.style.width = width+'px'

let u = navigator.userAgent;
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     
if(isIOS===true){
    document.body.addEventListener('touchmove' , function (e) {
        e.preventDefault() 
    }, {passive: false});
}
ReactDOM.render(<App />, document.getElementById("container"));