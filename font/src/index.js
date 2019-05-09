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
console.log(height,width)
ReactDOM.render(<App />, document.getElementById("container"));