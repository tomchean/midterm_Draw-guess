import Canvas from './Canvas';
import "./App.css";
import Viewer from './Viewer'
import React from 'react';
import Start from './Start';
import {  Switch, Route,BrowserRouter } from 'react-router-dom'

export default class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="component-app">
          <Switch>
            <Route path="/painter" component={Canvas}/>
            <Route path="/viewer" component={Viewer}/>
            <Route path="/" component={Start} />
          </Switch>
        </div>
      </BrowserRouter>     
    );
  }
}
